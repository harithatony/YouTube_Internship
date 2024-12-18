import React from "react";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import moment from "moment"; // For time ago feature

type GridProps = {
  videos: any[];
  toggleBookmark: (video: any) => void;
  bookmarkedVideos: Set<string>; // Set to track bookmarked video IDs
};

const Grid: React.FC<GridProps> = ({ videos, toggleBookmark, bookmarkedVideos }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="p-4">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video: any) => {
            const isBookmarked = bookmarkedVideos.has(video.id.videoId);

            return (
              <div
                key={video.id.videoId}
                className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div onClick={() => handleVideoClick(video.id.videoId)}>
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 truncate">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {moment(video.snippet.publishedAt).fromNow()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => toggleBookmark(video)} // Call toggle function
                    className="text-blue-500 text-lg"
                  >
                    {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No videos to display. Search for something!
        </p>
      )}
    </div>
  );
};

export default Grid;
