import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import supabase from "../../utils/supabase";
import FollowButton from "../common/FollowButton";
import { useAuthStore } from "../../stores/authStore";
import FollowListModal from "./FollowListModal";
import { useFollowStore } from "../../stores/followStore";
import { Follow, Profile } from "../../types/type";

export default function UserHeader({
  isOwner,
  userData,
  userFollowing,
  userFollower,
  postCount,
  onEditClick,
}: {
  isOwner: boolean;
  userData: Profile;
  userFollowing: Follow[] | null;
  userFollower: Follow[] | null;
  postCount: number;
  onEditClick: () => void;
}) {
  const [followingModal, setFollowingModal] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  const [followingList, setFollowingList] = useState<Profile[]>([]);
  const [followerList, setFollowerList] = useState<Profile[]>([]);
  const followingRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const defaultImg = "/images/cosmos/alien.svg";
  const currentUser = useAuthStore((state) => state.userData);
  const { fetchFollowing } = useFollowStore();

  // 공통 프로필 fetch
  const fetchProfiles = async (
    ids: string[],
    setter: (list: Profile[]) => void
  ) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .in("id", ids);
    if (!error && data) setter(data);
  };

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        followingModal &&
        followingRef.current &&
        !followingRef.current.contains(e.target as Node)
      ) {
        setFollowingModal(false);
      }
      if (
        followerModal &&
        followerRef.current &&
        !followerRef.current.contains(e.target as Node)
      ) {
        setFollowerModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [followingModal, followerModal]);

  // 팔로잉 팔로워 리스트 불러오기
  useEffect(() => {
    if (userFollowing) {
      const ids = userFollowing.map((f) => f.following_id);
      fetchProfiles(ids, setFollowingList);
    }
  }, [userFollowing]);

  useEffect(() => {
    if (userFollower) {
      const ids = userFollower.map((f) => f.follower_id);
      fetchProfiles(ids, setFollowerList);
    }
  }, [userFollower]);

  useEffect(() => {
    if (currentUser?.id) fetchFollowing(currentUser.id);
  }, [currentUser?.id]);

  return (
    <div className="px-0 lg:px-4 flex justify-between">
      <div className="w-full flex items-center">
        {/* 유저 아이콘 */}
        <img
          src={
            userData?.avatar_url && userData?.avatar_url.length > 0
              ? userData?.avatar_url
              : defaultImg
          }
          alt="profileImage"
          className="size-18 md:size-20 lg:size-25 rounded-full aspect-square object-cover object-center"
        />
        <div className="w-full ml-2 lg:ml-4">
          <div className="flex justify-between items-center mb-2 md:mb-2 lg:mb-4">
            {/* 유저이름 */}
            <div className="pl-2.5 md:pl-3 lg:pl-5 text-white text-lg md:text-xl font-bold">
              {userData?.username}
            </div>
            {/* 본인o editprofile / 본인x follow */}
            <div className="group">
              {isOwner ? (
                <Button
                  variant="hover_fill"
                  className="py-1.5 md:py-2 text-[10px] md:text-xs"
                  onClick={onEditClick}
                >
                  Edit Profile
                </Button>
              ) : (
                // 팔로우버튼
                <FollowButton
                  followingId={userData.id}
                  className="text-xs "
                  onFollowChange={(newStatus) => {
                    if (currentUser && newStatus) {
                      setFollowerList((prev) => {
                        const already = prev.some(
                          (p) => p.id === currentUser.id
                        );
                        return already ? prev : [...prev, currentUser];
                      });
                    } else if (currentUser && !newStatus) {
                      setFollowerList((prev) =>
                        prev.filter((p) => p.id !== currentUser.id)
                      );
                    }
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex">
            {/* 팔로잉리스트 */}
            <div ref={followingRef}>
              <button
                type="button"
                className="flex flex-col items-center cursor-pointer w-[70px] md:w-[86px] lg:w-[100px]"
                onClick={() => {
                  setFollowingModal(true);
                  setFollowerModal(false);
                }}
              >
                <div className="text-white font-medium text-[16px] md:text-[18px]">
                  {followingList.length}
                </div>
                <div className="text-[var(--gray-200)] text-[12px] md:text-[14px]">
                  Following
                </div>
              </button>
              {/* 팔로잉모달 */}
              {followingModal && (
                <FollowListModal
                  title="Following"
                  list={followingList}
                  currentUserId={currentUser?.id ?? null}
                  isOwner={isOwner}
                  onClose={() => setFollowingModal(false)}
                  onFollowChange={(targetId, newStatus) => {
                    if (!newStatus) {
                      setFollowingList((prev) =>
                        prev.filter((p) => p.id !== targetId)
                      );
                    }
                  }}
                />
              )}
            </div>
            {/* 팔로워리스트 */}
            <div ref={followerRef}>
              <button
                type="button"
                className="flex flex-col items-center cursor-pointer w-[70px] md:w-[86px] lg:w-[100px]"
                onClick={() => {
                  setFollowerModal(true);
                  setFollowingModal(false);
                }}
              >
                <div className="text-white font-medium text-[16px] md:text-[18px]">
                  {followerList.length}
                </div>
                <div className="text-[var(--gray-200)] text-[12px] md:text-[14px]">
                  Followers
                </div>
              </button>
              {/* 팔로우모달 */}
              {followerModal && (
                <FollowListModal
                  title="Followers"
                  list={followerList}
                  currentUserId={currentUser?.id ?? null}
                  isOwner={isOwner}
                  onClose={() => setFollowerModal(false)}
                  onFollowChange={(targetId, newStatus) => {
                    if (newStatus) {
                      supabase
                        .from("profiles")
                        .select()
                        .eq("id", targetId)
                        .single()
                        .then(({ data }) => {
                          if (data) {
                            setFollowingList((prev) =>
                              prev.some((p) => p.id === data.id)
                                ? prev
                                : [...prev, data]
                            );
                          }
                        });
                    } else {
                      setFollowingList((prev) =>
                        prev.filter((p) => p.id !== targetId)
                      );
                    }
                  }}
                />
              )}
            </div>
            {/* 게시글카운트 */}
            <div className="flex flex-col items-center w-[70px] md:w-[86px] lg:w-[100px]">
              <div className="text-white font-medium text-[16px] md:text-[18px]">
                {postCount}
              </div>
              <div className="text-[var(--gray-200)] text-[12px] md:text-[14px]">
                Posts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
