import { useEffect, useState } from "react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import GalleryCard from "./GalleryCard";
import { GalleryPosts } from "../../../api/gallery/gallerypost";
import { GalleryPost } from "../../../types/gallery";
import GalleryCardSkeleton from "./GalleryCardSkeleton";
import { useAuthStore } from "../../../stores/authStore";
import SearchInput from "../../common/SearchInput";

export default function Gallery() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [searchTerm, setSearchTerm] = useState("");
  const savedSort = sessionStorage.getItem("gallery_sortBy") || "like.desc";
  const [sortBy, setSortBy] = useState<string>(savedSort);
  const [originalPosts, setOriginalPosts] = useState<GalleryPost[]>([]);
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const sortPosts = (data: GalleryPost[], sort: string) => {
    return [...data].sort((a, b) => {
      if (sort === "like.desc") {
        const likeDiff = (b.like_count ?? 0) - (a.like_count ?? 0);
        if (likeDiff !== 0) return likeDiff;

        // 좋아요 수가 같으면 최신순
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else if (sort === "release_date.desc") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });
  };

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await GalleryPosts();
      setOriginalPosts(fetchedPosts);
      const initialSorted = sortPosts(fetchedPosts, sortBy);
      setPosts(initialSorted);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setSortBy("like.desc");
      sessionStorage.removeItem("gallery_sortBy");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (originalPosts.length === 0) return;
    const sorted = sortPosts(originalPosts, sortBy);
    setPosts(sorted);
  }, [sortBy, originalPosts]);

  const handleSortClick = (sortValue: string) => {
    setSortBy(sortValue);
    sessionStorage.setItem("gallery_sortBy", sortValue);
  };

  const handlePostUpdate = (updatedPost: GalleryPost & { liked: boolean }) => {
    const updatedOriginalPosts = originalPosts.map((p) =>
      p.id === updatedPost.id
        ? { ...p, like_count: updatedPost.like_count, liked: updatedPost.liked }
        : p
    );
    setOriginalPosts(updatedOriginalPosts);

    const filtered = updatedOriginalPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = sortPosts(filtered, sortBy);
    setPosts(sorted);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const filtered = originalPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    const sorted = sortPosts(filtered, sortBy);
    setPosts(sorted);
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start md:items-center mb-[24px] gap-4">
        <ul className="flex ml-2 gap-4 text-[13px] font-medium sm:ml-2">
          <li
            className={`cursor-pointer ${
              sortBy === "like.desc" ? "text-[#D0F700]" : ""
            }`}
            onClick={() => handleSortClick("like.desc")}
          >
            좋아요순
          </li>
          <li
            className={`cursor-pointer ${
              sortBy === "release_date.desc" ? "text-[#D0F700]" : ""
            }`}
            onClick={() => handleSortClick("release_date.desc")}
          >
            최신순
          </li>
        </ul>

        <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-2">
          <div className="relative">
            <SearchInput
              scope="gallery"
              value={searchTerm}
              setValue={setSearchTerm}
              onSearch={handleSearch}
              placeholder="게시글 검색"
              className="w-[200px] lg:w-[280px]"
            />
          </div>
          <Button
            variant={isLoggedIn ? "neon_filled" : "disabled"}
            onClick={() => navigate("/lounge/gallery/add")}
            className="font-[yapari] font-medium text-xs lg:text-sm ml-2 h-[35px] whitespace-nowrap"
          >
            + Post
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-6 md:gap-x-10 lg:gap-x-14 xl:gap-x-20 
                  gap-y-20 mb-[50px]"
      >
        {isLoading
          ? Array.from({ length: 2 }).map((_, idx) => (
              <GalleryCardSkeleton key={idx} />
            ))
          : posts.map((post) => {
              if (!post || !post.gallery_images) return null;
              return (
                <GalleryCard
                  key={post.id}
                  post={post}
                  onLikeToggle={handlePostUpdate}
                />
              );
            })}
      </div>
    </>
  );
}
