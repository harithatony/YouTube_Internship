import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoMenu,
  IoLogoYoutube,
  IoSearch,
  IoFilter,
  IoPersonCircle,
  IoBookmark,
} from "react-icons/io5";

type NavbarProps = {
  onSearchResults: (videos: any[]) => void; // Callback to pass search results
};

const Navbar: React.FC<NavbarProps> = ({ onSearchResults }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Replace with your API key
  const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

  // Toggle filter dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        filterButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery) return; // Skip if search query is empty
    try {
      const response = await axios.get(YOUTUBE_API_URL, {
        params: {
          part: "snippet",
          q: `${searchQuery} ${selectedFilter === "All" ? "" : selectedFilter}`,
          key: API_KEY,
          maxResults: 100,
          type: "video",
        },
      });
      onSearchResults(response.data.items); // Send search results to parent
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Navigate to bookmarks
  const handleBookmarkNavigation = () => {
    navigate("/bookmarks");
  };

  return (
    <nav className="border-b-2 h-16 flex justify-between items-center px-4 bg-white shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button className="text-2xl" title="Menu">
          <IoMenu />
        </button>
        <div
          className="flex items-center space-x-1 text-red-600 cursor-pointer"
          title="YouTube Home"
          onClick={() => window.location.reload()} // Refresh the page
        >
          <IoLogoYoutube size={28} />
          <span className="text-lg font-bold text-black">YouTube</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-1 max-w-2xl mx-4 relative">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border p-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Search Videos"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-200 p-3 hover:bg-gray-300 rounded-r-full"
          title="Search"
        >
          <IoSearch size={20} />
        </button>

        {/* Filter Button */}
        <button
          ref={filterButtonRef}
          className="bg-gray-200 p-3 ml-1 rounded-full hover:bg-gray-300"
          onClick={toggleDropdown}
          title="Filter Videos"
        >
          <IoFilter size={20} />
        </button>

        {/* Bookmark Button */}
        <button
          className="bg-gray-200 p-3 ml-1 rounded-full hover:bg-gray-300"
          onClick={handleBookmarkNavigation}
          title="View Bookmarks"
        >
          <IoBookmark size={20} />
        </button>

        {/* Dropdown for filters */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute mt-2 right-0 bg-white border rounded shadow-lg w-64 z-10"
          >
            <ul>
              {[
                "All",
                "Movies",
                "Sports",
                "Music",
                "Gaming",
                "Vlogs",
                "Tech and Gadgets",
                "Education and Learning",
                "Health and Fitness",
                "Comedy and Entertainment",
                "Beauty and Fashion",
                "Animals and Pets",
                "Food and Cooking",
              ].map((filter) => (
                <li
                  key={filter}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect(filter)}
                  title={`Filter by ${filter}`}
                >
                  <input
                    type="radio"
                    name="filter"
                    value={filter}
                    checked={selectedFilter === filter}
                    onChange={() => handleFilterSelect(filter)}
                    className="mr-2"
                  />
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800" title="Profile">
          <IoPersonCircle size={32} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;



