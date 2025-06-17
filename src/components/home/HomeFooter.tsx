import ExploreNav from "./ExploreNav";
import CommunityNav from "./CommunityNav";
import GamesNav from "./GamesNav";
import AboutNav from "./AboutNav";

export default function HomeFooter() {
  return (
    <div className="w-[400px] md:w-[640px] lg:w-[800px] xl:w-[1080px] flex justify-between pb-20 flex-col md:flex-row gap-10 md:gap-0">
      <ExploreNav />
      <CommunityNav />
      <GamesNav />
      <AboutNav />
    </div>
  );
}
