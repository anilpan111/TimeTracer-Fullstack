import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = time => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);
    const hours = Math.floor(time / 3600000);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div className='w-full h-auto flex flex-col  justify-center'>
      <div className="text-5xl font-mono mb-8 text-[#00df9a]">
        {formatTime(time)}
      </div>
      <div className="space-x-4">
        <button
          onClick={startStopwatch}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Start
        </button>
        <button
          onClick={stopStopwatch}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Stop
        </button>
        <button
          onClick={resetStopwatch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
