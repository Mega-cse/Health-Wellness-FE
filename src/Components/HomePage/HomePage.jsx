import React, { useEffect, useState } from 'react';
import './HomePage.css'; 
import TestimonialsSlider from './TestimonalSlider';
import Modal from './Modal'; // Import the Modal component
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentYogaIndex, setCurrentYogaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",   
    "/images/image4.jpg"
  ];
  const yogaImages = [
    "/images/yoga1.jpg",
    "/images/yoga2.jpg",
    "/images/yoga3.jpg",
    "/images/yoga4.jpg"
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handlePrevYoga = () => {
    setCurrentYogaIndex((prevIndex) => (prevIndex - 1 + yogaImages.length) % yogaImages.length);
  };

  const handleNextYoga = () => {
    setCurrentYogaIndex((prevIndex) => (prevIndex + 1) % yogaImages.length);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true); // Open modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };



  return (
    <div className="homepage">
      <div className="image-slider">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Health Image ${index + 1}`}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="photo-section">
        <img src="/images/photo.jpg" alt="Wellness Photo" className="wellness-photo" />
        <div className="photo-description">
          <h2>Embrace Wellness</h2>
          <p>Discover ways to enhance your well-being through balanced living.</p>
        </div>
      </div>

      <div className="tips-section">
        <div className="tips-description">
          <h2>Health Tips</h2>
          <p>Here are some essential tips to maintain a healthy lifestyle:</p>
          <ul>
            <li>Stay hydrated by drinking plenty of water throughout the day.</li>
            <li>Incorporate regular physical activity into your daily routine.</li>
            <li>Maintain a balanced diet rich in fruits, vegetables, and whole grains.</li>
            <li>Practice mindfulness and stress-reducing techniques, such as meditation or yoga.</li>
            <li>Ensure you get adequate sleep each night to support overall health.</li>
          </ul>
        </div>
        <img src="/images/tips-image.jpg" alt="Health Tips Image" className="tips-image" />
      </div>

      <div className="yoga-card">
        <button className="arrow left-arrow" onClick={handlePrevYoga}>←</button>
        <img
          src={yogaImages[currentYogaIndex]}
          alt={`Yoga Image ${currentYogaIndex + 1}`}
          className="yoga-image"
        />
        <button className="arrow right-arrow" onClick={handleNextYoga}>→</button>
        <div className="yoga-description">
          <h2>Yoga for Wellness</h2>
          <p>Incorporate yoga into your routine for improved flexibility and relaxation.</p>
          <button className="view-button" onClick={handleViewDetails}>View</button>
        </div>
      </div>

      <TestimonialsSlider />

      {/* Modal for video */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h1>Yoga for Wellness</h1>
        <p>Learn the benefits of yoga and how to incorporate it into your life.</p>
        <video controls width="600">
          <source src="/videos/yoga-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>

         </div>
  );
};

export default HomePage;
