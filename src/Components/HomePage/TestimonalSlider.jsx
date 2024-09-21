import React, { useEffect, useState } from 'react';
import './Testimonial.css'; // Import CSS for styling
import Footer from '../Footer/Footer'
// Array of image paths
const images = [
  "/images/sarah.jpg",
  "/images/mark.jpg",
  "/images/emily.jpg",
  "/images/john.jpg"
];

const testimonials = [
  {
    id: 1,
    text: "This app has completely transformed my fitness journey! Highly recommended.",
    author: "Sarah J.",
    image: images[0], // Use the path from the array
  },
  {
    id: 2,
    text: "I love how easy it is to track my meals and workouts. A must-have!",
    author: "Mark T.",
    image: images[1], // Use the path from the array
  },
  {
    id: 3,
    text: "The mental health resources have been invaluable. Thank you!",
    author: "Emily R.",
    image: images[2], // Use the path from the array
  },
  {
    id: 4,
    text: "Fantastic app! It keeps me motivated and on track with my goals.",
    author: "John D.",
    image: images[3], // Use the path from the array
  },
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="testimonials-slider">
      <div className="testimonial">
        <img 
          src={testimonials[currentIndex].image} 
          alt={`${testimonials[currentIndex].author}`} 
          className="testimonial-image" 
        />
        <p>"{testimonials[currentIndex].text}"</p>
        <h4>- {testimonials[currentIndex].author}</h4>
      </div>
      <div className="indicators">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <Footer /> {/* Ensure Footer is placed at the end */}

    </div>
  );
};

export default TestimonialsSlider;
