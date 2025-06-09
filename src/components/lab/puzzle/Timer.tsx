import React, { useEffect } from "react";

export default function Timer({
  timeLeft,
  countTime,
  isRunning,
}: {
  timeLeft: number;
  countTime: () => void;
  isRunning: boolean;
}) {
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      countTime();
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (ms: number) => {
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  return <div>{formatTime(timeLeft)}</div>;
}
