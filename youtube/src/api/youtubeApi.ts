import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API Key
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const fetchYouTubeVideos = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: "snippet",
        q: query,
        key: API_KEY,
        maxResults: 10, // Fetch 10 videos at a time
        type: "video", // Ensures only video results
      },
    });
    return response.data.items; // Array of video items
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error; // Handle errors in your components
  }
};
