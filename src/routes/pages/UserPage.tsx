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
  const currentUser = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState<ProfileType>();
  const [activeTab, setActvieTab] = useState<"posts" | "followers">("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
    supabase
      .from("profiles")
      .select("*")
      .eq("usercode", code!)
      .then((data) => setUserData(data.data![0]));
  }, [location]);

  if (!userData) return <LoadingSpinner />;

  return (
    <div className="w-screen h-[88vh] px-[3vw] md:px-[10vw] py-10 flex">
      <div className="hidden md:flex md:w-[30%] flex-col">
        {code === currentUser?.usercode ? (
          <span className="text-2xl font-yapari text-[var(--primary-300)]">
            MY
          </span>
        ) : (
          <span className="text-2xl font-yapari">{userData?.username}</span>
        )}
        <span className="text-2xl font-yapari text-[var(--primary-300)]">
          SPACE
        </span>
      </div>
      <div className="flex flex-col gap-8 w-full md:w-[70%]">
        <UserHeader
          isOwner={code === currentUser?.usercode}
          userData={userData}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <UserBio userData={userData} />

        <div className="flex flex-col gap-3 h-full">
          <PostViewTabs
            isOwner={code === currentUser?.usercode}
            activeTab={activeTab}
            setActiveTab={setActvieTab}
          />

          {activeTab === "posts" ? <UserPostList /> : <FollowerPostList />}
        </div>
      </div>

      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-[color:var(--bg-color)] py-10 px-20 rounded-3xl shadow-lg text-center flex flex-col items-center justify-between h-auto gap-12 w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <EditProfileModal
              userData={userData}
              setIsEditModalOpen={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
