import { useEffect, useState } from "react";
import { Player } from "../types/player";
import supabase from "../utils/supabase";

export default function usePuzzleLeaderBoard() {
  const [puzzlePlayers, setPuzzlePlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("puzzle_leaderboard")
        .select("*");

      if (error) {
        console.error("랭킹 불러오기 실패 : ", error);
      } else {
        setPuzzlePlayers(data);
      }
      setIsLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return { puzzlePlayers, isLoading };
}
