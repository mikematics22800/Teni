import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop 
        muted
        playsInline
        className="h-screen w-screen object-cover"
      >
        <source src={'/travel.mp4'} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
