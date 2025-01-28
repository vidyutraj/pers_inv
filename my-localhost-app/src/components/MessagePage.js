import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MessagePage = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [catDance, setCatDance] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Timer for Heart, Confetti, and Cat Dance animations
    setTimeout(() => {
      setShowHeart(true);
    }, 1000);

    setTimeout(() => {
      setShowConfetti(true);
    }, 2000);

    setTimeout(() => {
      setCatDance(true);
    }, 3000);

    // Countdown to February 14, 2025
    const targetDate = new Date('2025-02-14T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  // Function to handle the replay action
  const handleReplay = () => {
    navigate('/');
  };

  return (
      <div className="message-container">
        <h1 className="message-header">yay! 🎉</h1>
        <p className="message-text">you've been "valentined" by vidyut! time till we see each other ↓ ❤️</p>

        {/* Countdown Display */}
        <div className="countdown">
          <div className="countdown-item">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>

        {showHeart && (
            <div className="heart">
              ❤️
            </div>
        )}

        {showConfetti && (
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
        )}


        <div className="balloon-container">
          <div className="balloon">🎈</div>
          <div className="balloon">🎈</div>
          <div className="balloon">🎈</div>
        </div>

        {/* Replay Button */}
        <button className="replay-button" onClick={handleReplay}>
          Replay
        </button>
      </div>
  );
};

export default MessagePage;
