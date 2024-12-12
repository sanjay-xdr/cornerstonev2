import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, ClockIcon, CoffeeIcon } from 'lucide-react';
import { BaseColor ,COLOR_SCHEMES } from "../assets/Color"; // Ensure this is correctly defined and imported

interface PomodoroTimerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  colorScheme: keyof typeof COLOR_SCHEMES; // Use keyof to match the `COLOR_SCHEMES` keys
  glassEffect: boolean;
  blurAmount: number;
}

const PomodoroTimerPanel: React.FC<PomodoroTimerPanelProps> = ({
  isOpen,
  onClose,
  colorScheme="red",
  glassEffect,
  blurAmount,
}) => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

  const [timeRemaining, setTimeRemaining] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      if (!isBreak) {
        // Work session ended
        setCompletedSessions((prev) => prev + 1);

        if (completedSessions + 1 === sessionsBeforeLongBreak) {
          // Long break time
          setTimeRemaining(longBreakDuration * 60);
          setIsBreak(true);
        } else {
          // Short break
          setTimeRemaining(breakDuration * 60);
          setIsBreak(true);
        }
      } else {
        // Break ended, start work session again
        setTimeRemaining(workDuration * 60);
        setIsBreak(false);

        if (completedSessions + 1 === sessionsBeforeLongBreak) {
          setCompletedSessions(0);
        }
      }

      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, completedSessions, breakDuration, longBreakDuration, sessionsBeforeLongBreak, workDuration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeRemaining(workDuration * 60);
    setIsRunning(false);
    setIsBreak(false);
  };


  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        ${glassEffect 
          ? `bg-white/10 backdrop-blur` // Apply `backdrop-blur` without dynamic classes
          : 'bg-gray-800/90'
        }`}
      style={glassEffect ? { backdropFilter: `blur(${blurAmount}px)` } : {}}
    >
      <div className="p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            COLOR_SCHEMES[colorScheme].hover
          }`}
        >
          ✕
        </button>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div
            className={`text-6xl font-bold mb-4 ${
              COLOR_SCHEMES[colorScheme].primary
            }`}
          >
            {formatTime(timeRemaining)}
          </div>
          <div
            className={`text-xl ${
              isBreak ? 'text-green-500' : COLOR_SCHEMES[colorScheme].primary
            }`}
          >
            {isBreak ? 'Break Time' : 'Focus Time'}
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-3 rounded-full ${
              COLOR_SCHEMES[colorScheme].hover
            }`}
          >
            {isRunning ? <Pause /> : <Play />}
          </button>
          <button
            onClick={resetTimer}
            className={`p-3 rounded-full ${
              COLOR_SCHEMES[colorScheme].hover
            }`}
          >
            <RefreshCw />
          </button>
        </div>

        {/* Timer Settings */}
        <div className="space-y-4">
          {/* Work Duration */}
          <DurationControl
            label="Work Duration"
            icon={<ClockIcon />}
            value={workDuration}
            onIncrease={() => setWorkDuration(workDuration + 1)}
            onDecrease={() => setWorkDuration(Math.max(1, workDuration - 1))}
            colorScheme={COLOR_SCHEMES[colorScheme]}
          />

          {/* Break Duration */}
          <DurationControl
            label="Break Duration"
            icon={<CoffeeIcon />}
            value={breakDuration}
            onIncrease={() => setBreakDuration(breakDuration + 1)}
            onDecrease={() => setBreakDuration(Math.max(1, breakDuration - 1))}
            colorScheme={COLOR_SCHEMES[colorScheme]}
          />

          {/* Long Break Duration */}
          <DurationControl
            label="Long Break Duration"
            icon={<ClockIcon />}
            value={longBreakDuration}
            onIncrease={() => setLongBreakDuration(longBreakDuration + 1)}
            onDecrease={() => setLongBreakDuration(Math.max(1, longBreakDuration - 1))}
            colorScheme={COLOR_SCHEMES[colorScheme]}
          />

          {/* Sessions Before Long Break */}
          <DurationControl
            label="Sessions Before Long Break"
            icon={<ClockIcon />}
            value={sessionsBeforeLongBreak}
            onIncrease={() => setSessionsBeforeLongBreak(sessionsBeforeLongBreak + 1)}
            onDecrease={() => setSessionsBeforeLongBreak(Math.max(1, sessionsBeforeLongBreak - 1))}
            colorScheme={COLOR_SCHEMES[colorScheme]}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimerPanel;

interface DurationControlProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  colorScheme: { primary: string; hover: string };
}

const DurationControl: React.FC<DurationControlProps> = ({
  label,
  icon,
  value,
  onIncrease,
  onDecrease,
  colorScheme,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-white">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className={`p-1 rounded ${colorScheme.hover}`}
      >
        -
      </button>
      <span className="text-white">{value} min</span>
      <button
        onClick={onIncrease}
        className={`p-1 rounded ${colorScheme.hover}`}
      >
        +
      </button>
    </div>
  </div>
);
