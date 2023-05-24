import React, { useState, useEffect } from 'react';
import './App.css';

function Timer({ initialTime }) {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer">{formatTime(time)}</div>
      <div className="button-container">
        <button className={`button ${isActive ? 'active' : ''}`} onClick={handleStart}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <h1>Courte pause</h1>
      <Timer initialTime={5 * 60} />
      <h1>Longue pause</h1>
      <Timer initialTime={10 * 60} />
    </div>
  );
}

export default App;
