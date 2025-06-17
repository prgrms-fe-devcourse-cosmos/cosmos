import ExploreNav from "./ExploreNav";
import CommunityNav from "./CommunityNav";
import GamesNav from "./GamesNav";
import AboutNav from "./AboutNav";

export default function HomeFooter() {
  return (
    <div className="w-[1080px] flex justify-between pb-20">
      <ExploreNav />
      <CommunityNav />
      <GamesNav />
      <AboutNav />
    </div>
  );
}
