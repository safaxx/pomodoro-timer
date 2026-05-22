import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useRef, useState } from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";

function Timer({ focusMinutes, breakMinutes, onSettingsClick }) {
  const [mode, setMode] = useState("work");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const sessionEndAudio = useRef(new Audio("/sounds/session-ended.mp3"));

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          if (mode === "work") {
            sessionEndAudio.current.currentTime = 0;
            sessionEndAudio.current.play().catch((error) => {
              console.log("Audio play failed:", error);
            });

            setMode("break");
            return breakMinutes * 60;
          }

          setMode("work");
          setIsPlaying(false);
          return focusMinutes * 60;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, mode, breakMinutes, focusMinutes]);

  useEffect(() => {
    if (hasStarted) {
      return;
    }

    if (mode === "work") {
      setTimeLeft(focusMinutes * 60);
    } else {
      setTimeLeft(breakMinutes * 60);
    }
  }, [focusMinutes, breakMinutes, mode, hasStarted]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const red = "#f54e4e";
  const green = "#08a747";

  const handleReset = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setMode("work");
    setTimeLeft(focusMinutes * 60);
  };

  const handlePlay = () => {
    if (timeLeft > 0) {
      setHasStarted(true);
      setIsPlaying(true);
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-label">{mode === "work" ? "Focus" : "Break"}</div>

      <CircularProgressbar
        value={timeLeft}
        maxValue={mode === "work" ? focusMinutes * 60 : breakMinutes * 60}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div className="timer-controls">
        {isPlaying ? (
          <PauseButton onClick={() => setIsPlaying(false)} />
        ) : (
          <PlayButton
            onClick={handlePlay}
            label={hasStarted ? "Resume" : "Start"}
          />
        )}
        <ResetButton onClick={handleReset} />
        <SettingsButton onClick={onSettingsClick} />
      </div>
    </div>
  );
}

export default Timer;
