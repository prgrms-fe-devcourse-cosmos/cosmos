import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function PuzzleResultModal({
  onClose,
  score,
  title,
  explanation,
  imgSrc,
}: {
  onClose: () => void;
  score: number;
  title: string;
  explanation: string;
  imgSrc: string;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100 flex justify-center items-center ">
        <div className="bg-[color:var(--bg-color)] p-10 rounded-3xl shadow-lg text-center  flex flex-col items-center justify-between h-auto gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-2xl">
              {score !== 0 ? "🎉 Puzzle Complete!" : "⏰ Time's Up!"}
            </p>
            <p className="text-xl text-white">Score : {score}</p>
          </div>

          <div className="flex w-[600px] gap-10">
            <img
              className="max-h-[400px] w-[40%] object-contain"
              src={imgSrc}
              alt=""
            />
            <div className="w-[60%]  flex flex-col justify-center text-left overflow-hidden gap-3 items-center">
              <p className="w-full">{title}</p>
              <p className="text-white font-[helvetica-neue] text-sm leading-6">
                {explanation}
              </p>
            </div>
          </div>

          <div className="flex justify-center w-full gap-10">
            <div className="group">
              <Button variant="back" onClick={onClose}>
                RETRY
              </Button>
            </div>
            <div className="group">
              <Button
                variant="hover_fill"
                onClick={() => navigate("/lab/rank")}
              >
                RANK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
