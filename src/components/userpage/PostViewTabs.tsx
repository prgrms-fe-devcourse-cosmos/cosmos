export default function PostViewTabs({
  isOwner,
  activeTab: activeTab,
  setActiveTab: setActiveTab,
}: {
  isOwner: boolean;
  activeTab: "posts" | "followers";
  setActiveTab: (tab: "posts" | "followers") => void;
}) {
  return (
    <div className="flex mb-0">
      <button
        type="button"
        className="text-[13px] md:text-[16px] w-full text-center py-2.5 border-b border-b-[#00000000] disabled:border-b-[var(--primary-300)] 
        font-yapari text-[var(--gray-200)] disabled:text-[var(--primary-300)] cursor-pointer disabled:cursor-default"
        disabled={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
      >
        POSTS
      </button>
      {isOwner && (
        <button
          type="button"
          className="text-[13px] md:text-[16px] w-full text-center py-2.5 border-b border-b-[#00000000] disabled:border-b-[var(--primary-300)] 
          font-yapari text-[var(--gray-200)] disabled:text-[var(--primary-300)] cursor-pointer disabled:cursor-default"
          disabled={activeTab === "followers"}
          onClick={() => setActiveTab("followers")}
        >
          FOLLOWERS
        </button>
      )}
    </div>
  );
}
