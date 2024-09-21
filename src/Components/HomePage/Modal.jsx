import React, { useState } from 'react';
import './Modal.css'; // Make sure to include your CSS styles

const Modal = ({ isOpen, onClose, images, children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const handleNextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        {images ? (
          <div className="chart-images">
            <button className="arrow left-arrow" onClick={handlePrevImage}>←</button>
            <img
              src={images[currentImageIndex]}
              alt={`Chart ${currentImageIndex + 1}`}
              className="chart-image"
            />
            <button className="arrow right-arrow" onClick={handleNextImage}>→</button>
          </div>
        ) : (
          children // Render children if no images are provided
        )}
      </div>
    </div>
  );
};

export default Modal;
