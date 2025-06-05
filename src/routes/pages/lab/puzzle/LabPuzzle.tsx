import React from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

export default function LabPuzzle() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <JigsawPuzzle
        imageSrc="/images/puzzle/space/astronaut.jpg"
        rows={3}
        columns={4}
        onSolved={() => alert("solved")}
      />
    </div>
  );
}
