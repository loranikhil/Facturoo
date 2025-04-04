import React, { useState } from "react";
import "./CustomerFunGame.css";
 
const CustomerFunGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [reward, setReward] = useState("");
  const [spinDegree, setSpinDegree] = useState(0);
 
  const rewards = [
    "50% OFF Pizza",
    "BOGO Burger",
    "Better Luck Next Time",
    "30% OFF Pasta",
    "Free Drink",
    "Better Luck Next Time",
    "Free Appetizer",
    "Better Luck Next Time"
  ];
 
  const totalSegments = rewards.length;
  const segmentAngle = 360 / totalSegments;
 
  const handleSpin = () => {
    if (isSpinning) return;
 
    setShowResult(false);
    setIsSpinning(true);
 
    // Generate a random reward index
    const selectedIndex = Math.floor(Math.random() * totalSegments);
    const selectedReward = rewards[selectedIndex];
 
    // Calculate rotation: at least 5 full rotations + selected segment alignment
    const extraRotations = 5 * 360;
    const rotationNeeded = extraRotations + (360 - selectedIndex * segmentAngle);
 
    setSpinDegree(rotationNeeded);
    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);
      setReward(selectedReward);
    }, 5000);
  };
 
  return (
    <div className="fun-game">
      <h1>🎲 Spin & Win!</h1>
      <div className="game-box">
        <div className="spinner-section">
          <div className="pointer"></div>
          <div className="wheel-container">
            <div className="wheel" style={{ transform: `rotate(${spinDegree}deg)` }}>
              {rewards.map((item, index) => {
                const rotation = index * segmentAngle;
                return (
                  <div key={index} className="wheel-segment" style={{ transform: `rotate(${rotation}deg)` }}>
                    <span className="segment-label">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
 
        <div className="controls">
          {!showResult ? (
            <button className={`spin-button ${isSpinning ? 'disabled' : ''}`} onClick={handleSpin} disabled={isSpinning}>
              {isSpinning ? 'Spinning...' : '🎡 Spin Now'}
            </button>
          ) : (
            <div className="result-container">
              <h2>{reward === "Better Luck Next Time" ? "😔 Try Again!" : "🎉 Congratulations!"}</h2>
              <div className="reward-card">
                <div className="reward-title">You Won:</div>
                <div className="reward-value">{reward}</div>
                {reward !== "Better Luck Next Time" && (
                  <div className="reward-code">CODE: FOOD{Math.floor(Math.random() * 9000) + 1000}</div>
                )}
              </div>
              <div className="action-buttons">
                {reward !== "Better Luck Next Time" ? (
                  <button className="redeem-button">Redeem Now</button>
                ) : null}
                <button className="play-again-button" onClick={() => setShowResult(false)}>Play Again</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default CustomerFunGame;