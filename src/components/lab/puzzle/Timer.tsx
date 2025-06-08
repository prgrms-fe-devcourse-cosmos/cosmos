import React, { useEffect } from "react";

export default function Timer({
  timeLeft,
  countTime,
}: {
  timeLeft: number;
  countTime: () => void;
}) {
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      countTime();
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div>
      {minutes} : {seconds}
    </div>
  );
}
