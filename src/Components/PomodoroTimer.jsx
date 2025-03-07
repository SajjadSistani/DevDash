import { useState, useEffect, useRef } from "react";
import { translations } from "../translations";

const PomodoroTimer = ({ theme, languageId }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const timerRef = useRef(null);
  const t = translations[languageId];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsWorkTime(!isWorkTime);
            return isWorkTime ? 5 * 60 : 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkTime(true);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`rounded-md flex flex-col items-center p-6 shadow-[0px_0px_8px_3px_rgba(0,_0,_0,_0.1)] ${
        theme === "light" ? "bg-gray-100" : "bg-gray-700"
      }`}
    >
      <h3 className="text-xl font-['Vazir'] mb-4">
        {isWorkTime ? t.workTime : t.breakTime}
      </h3>
      <div className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-md font-['Vazir'] ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white transition-colors`}
        >
          {isRunning ? t.pause : t.start}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-md font-['Vazir'] bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        >
          {t.reset}
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
