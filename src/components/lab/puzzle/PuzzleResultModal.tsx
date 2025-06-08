import React from "react";

export default function PuzzleResultModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100 flex justify-center items-center ">
        <div className="bg-[color:var(--bg-color)] p-10 rounded-3xl shadow-lg text-center w-[320px] flex flex-col items-center gap-2">
          Completed!
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </>
  );
}
