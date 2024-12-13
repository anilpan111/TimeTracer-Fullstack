import { Button } from "@nextui-org/react";
import React, { useState, useRef } from "react";

const Stopwatch = ({ onStop }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const toggleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (onStop) onStop(time); // Send total time when stopped
    } else {
      // Start the stopwatch
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000); // Increment by 1 second
      }, 1000);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    console.log("Total time:", time);
    setTime(0);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);

    const getSeconds = `0${seconds}`.slice(-2);
    const getMinutes = `0${minutes}`.slice(-2);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center py-8">
      <div className="text-5xl font-mono mb-8 text-black mx-auto font-semibold flex gap-4 items-center">
        <p className="text-4xl font-semibold">You completed: </p>
        {formatTime(time)}
        <div className="flex flex-col gap-1">
          <Button
            variant="solid"
            size="sm"
            color={isRunning ? "danger" : "primary"}
            onClick={toggleStartStop}
            className="font-bold"
          >
            {isRunning ? "Stop" : "Start"}
          </Button>

          <Button
            color="secondary"
            variant="solid"
            size="sm"
            onClick={resetStopwatch}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="felx ">
        <Button variant="ghost" className="w-60 bg-colorLevel5 mr-6">
          Reset event duration
        </Button>
        <Button variant="ghost" className="w-60 bg-colorLevel5">
          Mark as completed
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
