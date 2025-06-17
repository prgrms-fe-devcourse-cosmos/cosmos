import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LabQuiz() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<{ difficulty: string } | null>(null);

  const handleStart = (config: { difficulty: string }) => {
    setConfig(config);
    navigate("play");
  };

  return (
    <div className="w-full flex flex-col items-center pt-10">
      <Outlet context={{ onStart: handleStart, config }} />
    </div>
  );
}
