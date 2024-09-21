import React from 'react';

const YogaDetails = () => {
  return (
    <div className="yoga-details">
      <h1>Yoga for Wellness</h1>
      <p>Learn the benefits of yoga and how to incorporate it into your life.</p>
      <video controls width="600">
        <source src="/videos/yoga-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default YogaDetails;
