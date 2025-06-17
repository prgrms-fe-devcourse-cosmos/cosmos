import PageListItem from "./PageListItem";

const gamesPageList = [
  { name: "Puzzles", route: "/lab/puzzle" },
  { name: "Trivia Quiz", route: "/lab/quiz" },
  { name: "Leaderboard", route: "/lab/rank" },
];

export default function GamesNav() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Games</span>
      <div className="w-60 flex flex-col items-start text-[color:var(--gray-200)] gap-1">
        {gamesPageList.map((page) => (
          <PageListItem key={page.name} name={page.name} route={page.route} />
        ))}
      </div>
    </div>
  );
}
