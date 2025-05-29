import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop 
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
      >
        <source src={'/travel.mp4'} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30" />
    </div>
  );
};

export default VideoBackground;
