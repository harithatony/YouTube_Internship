// VideoPlay.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlay: React.FC = () => {
  const { videoId } = useParams(); // Get videoId from URL params
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    // Redirect if no videoId is found in URL
    if (!videoId) {
      setError('Video not found');
      navigate('/');
    }
  }, [videoId, navigate]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        {/* YouTube Embed Player */}
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoPlay;
