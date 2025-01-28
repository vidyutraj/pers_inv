import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [noButtonStyle, setNoButtonStyle] = useState({ top: '50%', left: '50%' });
  const [catImages, setCatImages] = useState([]);
  const navigate = useNavigate();

  // Fetch random cat image from the API
  const fetchCatImage = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      return response.data[0].url;
    } catch (error) {
      console.error('Error fetching cat image:', error);
      return '';
    }
  };

  const spawnCatImage = () => {
    fetchCatImage().then((imageUrl) => {
      const randomTop = Math.floor(Math.random() * 80) + 10;
      const randomLeft = Math.floor(Math.random() * 80) + 10;
      const newCatImage = { imageUrl, top: `${randomTop}%`, left: `${randomLeft}%` };

      setCatImages((prevCatImages) => [
        ...prevCatImages,
        newCatImage,
      ]);

      // Remove the cat image after 4 seconds
      setTimeout(() => {
        setCatImages((prevCatImages) =>
          prevCatImages.filter((cat) => cat.imageUrl !== newCatImage.imageUrl)
        );
      }, 4000);
    });
  };

  useEffect(() => {
    const interval = setInterval(spawnCatImage, 1000);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleNoHover = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setNoButtonStyle({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYesClick = () => {
    navigate('/message');
  };

  return (
    <div className="landing-container">
      <h1 className="question">
        <span className="greeting">hi shresta!</span>
        <span className="question-line">will you be my valentine?</span>
      </h1>
      <div className="cat-images-container">
        {catImages.map((cat, index) => (
          <img
            key={index}
            src={cat.imageUrl}
            alt={`Cute Cat ${index}`}
            className="cat-image"
            style={{ top: cat.top, left: cat.left }}
          />
        ))}
      </div>
      <div className="button-container">
        <button className="yes-button" onClick={handleYesClick}>Yes</button>
        <button
          className="no-button"
          style={noButtonStyle}
          onMouseEnter={handleNoHover}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
