import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import VideoPlay from "./components/VideoPlay";
import BookmarkGrid from "./components/BookmarkGrid"; // Import BookmarkGrid

const App: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]); // State to hold search results
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<string>>(
    new Set()
  ); // State to hold bookmarked video IDs
  const [bookmarkedVideoList, setBookmarkedVideoList] = useState<any[]>([]); // State to hold detailed bookmarked videos

  // Function to toggle bookmarks
  const toggleBookmark = (video: any) => {
    const videoId = video.id.videoId;

    // Update both Set and List at the same time
    setBookmarkedVideos((prev) => {
      const updated = new Set(prev);

      if (updated.has(videoId)) {
        updated.delete(videoId); // Remove from bookmarks
        setBookmarkedVideoList((prevList) =>
          prevList.filter((v) => v.id.videoId !== videoId) // Remove the video from the list
        );
      } else {
        updated.add(videoId); // Add to bookmarks
        setBookmarkedVideoList((prevList) => {
          // Ensure that the video isn't added twice
          if (!prevList.some((v) => v.id.videoId === videoId)) {
            return [...prevList, video]; // Add the video if not already in the list
          }
          return prevList;
        });
      }

      return updated;
    });
  };

  return (
    <Router>
      <div className="min-h-screen">
        {/* Pass the search results handler to the Navbar */}
        <Navbar onSearchResults={setVideos} />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <Grid
                videos={videos}
                toggleBookmark={toggleBookmark}
                bookmarkedVideos={bookmarkedVideos}
              />
            }
          />
          {/* Video Play Route */}
          <Route path="/video/:videoId" element={<VideoPlay />} />
          {/* Bookmarks Route */}
          <Route
            path="/bookmarks"
            element={
              <BookmarkGrid
                bookmarkedVideos={bookmarkedVideoList}
                toggleBookmark={toggleBookmark}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


