import { useEffect, useState } from "react";
import { Player } from "../types/player";
import supabase from "../utils/supabase";

export default function useQuizLeaderBoard() {
  const [quizPlayers, setQuizPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("quiz_scores")
        .select("profile_id, total_score, profiles(id, username, avatar_url)")
        .order("total_score", { ascending: false });

      if (error) {
        console.error("퀴즈 랭킹 불러오기 실패:", error);
      } else {
        const converted = data.map((item: any) => ({
          id: item.profiles.id,
          username: item.profiles.username,
          avatar_url: item.profiles.avatar_url,
          total_score: item.total_score,
        }));
        setQuizPlayers(converted);
      }

      setIsLoading(false);
    }

    fetchLeaderboard();
  }, []);

  return { quizPlayers, isLoading };
}
