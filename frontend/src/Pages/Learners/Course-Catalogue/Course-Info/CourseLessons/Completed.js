import React, { useState, useEffect } from 'react';
import './Completed.css';

const Confetti = () => {
    const redirectToAnotherPage = () => {
        window.location.href = '/profile';
    };
  const [confettiItems, setConfettiItems] = useState([]);

  useEffect(() => {
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
    
    const interval = setInterval(() => {
      if (confettiItems.length < 50) {
        setConfettiItems([
          ...confettiItems,
          {
            left: Math.random() * 100,
            animationDelay: Math.random() * 0,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [confettiItems]);

  return (
    <div className="confetti-container">
      {confettiItems.map((confetti, index) => (
        <div
          key={index}
          className="confetti"
          style={{
            left: `${confetti.left}%`,
            animationDelay: `${confetti.animationDelay}s`,
            backgroundColor: confetti.color,
          }}
        ></div>
      ))}
      <div className="message">
  <span className="grey-circle"></span>
  <h2>Congratulations!</h2>
  <p>You earned a badge.</p>
  <br></br>
  <button className="btn btn-secondary" onClick={redirectToAnotherPage}>
    Claim
  </button>
</div>

    </div>
  );
};

export default Confetti;
