import { useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import EditProfileModal from "../../components/userpage/EditProfileModal";
import UserHeader from "../../components/userpage/UserHeader";
import UserBio from "../../components/userpage/UserBio";
import PostViewTabs from "../../components/userpage/PostViewTabs";
import UserPostList from "../../components/userpage/UserPostList";
import FollowerPostList from "../../components/userpage/FollowerPostList";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function UserPage() {
  const code = useParams().code;
  const location = useLocation();
  const { userData: currentUser } = useAuthStore();
  const [activeTab, setActvieTab] = useState<"posts" | "followers">("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Profile | null>(null);
  const [userPostList, setUserPostList] = useState<Post[] | null>(null);
  const [userFollower, setUserFollower] = useState<Follow[] | null>(null);
  const [userFollowing, setUserFollowing] = useState<Follow[] | null>(null);
  const [followerPosts, setFollowerPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const isOwner = code === currentUser?.usercode;

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsEditModalOpen(false);
      }
    };
    if (isEditModalOpen) {
      document.addEventListener("mousedown", outsideClickHandler);
    }
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [isEditModalOpen, setIsEditModalOpen]);

  useEffect(() => {
    setIsLoading(true);
    supabase
      .from("profiles")
      .select("*")
      .eq("usercode", code!)
      .then((data) => {
        setUserData(data.data![0]);
        setIsLoading(false);
      });
  }, [location]);

  useEffect(() => {
    if (userData) {
      // Posts
      supabase
        .from("posts")
        .select("*")
        .eq("profile_id", userData.id)
        .then((data) => setUserPostList(data.data));
      // Following
      supabase
        .from("follows")
        .select("*")
        .eq("follower_id", userData.id)
        .then((data) => setUserFollowing(data.data));
      // Follower
      supabase
        .from("follows")
        .select("*")
        .eq("following_id", userData.id)
        .then((data) => setUserFollower(data.data));
    }
  }, [userData]);

  useEffect(() => {
    if (userFollowing) {
      userFollowing.forEach((element) => {
        supabase
          .from("posts")
          .select()
          .eq("profile_id", element.following_id)
          .then((data) => setFollowerPosts((prev) => [...prev, ...data.data!]));
      });
    }
  }, [userFollowing]);

  // 프로필 수정 모달 열리면 바깥 스크롤 잠구기
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen]);

  if (isLoading || !userData) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-[1080px] m-auto px-[30px] sm:px-[40px] lg:px-0 py-10 flex">
      {/* 사이드바 */}
      <div className="hidden md:flex md:w-[30%] flex-col gap-2">
        {isOwner ? (
          <span className="text-4xl font-yapari text-[var(--primary-300)]">
            MY
          </span>
        ) : (
          <span className="text-3xl font-watermelon">
            {userData?.username}님의
          </span>
        )}
        <span className="text-4xl font-yapari text-[var(--primary-300)]">
          SPACE
        </span>
      </div>
      <div className="flex flex-col gap-5 w-full md:w-[70%]">
        <UserHeader
          isOwner={isOwner}
          userData={userData}
          userFollowing={userFollowing || null}
          userFollower={userFollower || null}
          postCount={userPostList ? userPostList.length : 0}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <UserBio userData={userData} />

        {/* 포스트탭/팔로우탭 */}
        <div className="py-4 lg:py-7 px-6 min-h-[500px] bg-[#141414]/80">
          {/* 탭 */}
          <PostViewTabs
            isOwner={code === currentUser?.usercode}
            activeTab={activeTab}
            setActiveTab={setActvieTab}
          />
          {/* 목록 */}
          {activeTab === "posts" ? (
            <UserPostList posts={userPostList} />
          ) : (
            <FollowerPostList posts={followerPosts} />
          )}
        </div>
      </div>

      {/* 프로필수정모달 */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div className="flex items-center bg-[color:var(--bg-color)] py-10 px-10 md:px-20 rounded-0 md:rounded-3xl shadow-lg h-full md:h-auto w-full md:w-[600px]">
            <div
              className="w-full text-center flex flex-col items-center justify-between gap-15 md:gap-12"
              onClick={(e) => e.stopPropagation()}
            >
              <EditProfileModal
                userData={userData}
                setIsEditModalOpen={setIsEditModalOpen}
                setUserData={setUserData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
