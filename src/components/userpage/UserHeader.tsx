import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import supabase from "../../utils/supabase";
import { LucideX } from "lucide-react";
import FollowButton from "../common/FollowButton";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

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

  // 팔로우 팔로잉 카운트 상태 추가
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  const handleFollowChange = (targetId: string, newStatus: boolean) => {
    if (newStatus) {
      // 팔로우 추가 - 리스트에 프로필 fetch 후 추가
      supabase
        .from("profiles")
        .select()
        .eq("id", targetId)
        .single()
        .then(({ data }) => {
          if (data) {
            setFollowingList((prev) => {
              // 중복 방지
              const alreadyInList = prev.some((p) => p.id === data.id);
              return alreadyInList ? prev : [...prev, data];
            });
            setFollowingCount((prev) => prev + 1);
          }
        });
    } else {
      // 언팔로우 - 리스트에서 제거
      setFollowingList((prev) => prev.filter((p) => p.id !== targetId));
      setFollowingCount((prev) => prev - 1);
    }
  };

  const currentUser = useAuthStore((state) => state.userData);

  // 상단 팔로우 버튼 전용
  const handleFollower = async (newStatus: boolean) => {
    if (!currentUser) return;
    if (newStatus) {
      setFollowerList((prev) => {
        const already = prev.some((p) => p.id === currentUser.id);
        return already ? prev : [...prev, currentUser];
      });
      setFollowerCount((prev) => prev + 1);
    } else {
      setFollowerList((prev) => prev.filter((p) => p.id !== currentUser.id));
      setFollowerCount((prev) => prev - 1);
    }
  };

  const handleUnfollowFromFollowerList = (targetId: string) => {
    setFollowerList((prev) => prev.filter((p) => p.id !== targetId));
    setFollowerCount((prev) => prev - 1);
  };

  function followingHandleClickOutside(event: MouseEvent) {
    if (
      followingRef.current &&
      !followingRef.current.contains(event.target as HTMLElement)
    ) {
      setFollowingModal(false);
    }
  }

  function followerHandleClickOutside(event: MouseEvent) {
    if (
      followerRef.current &&
      !followerRef.current.contains(event.target as HTMLElement)
    ) {
      setFollowerModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", followingHandleClickOutside);
    return () =>
      document.removeEventListener("click", followingHandleClickOutside);
  }, [followingRef]);

  useEffect(() => {
    document.addEventListener("click", followerHandleClickOutside);
    return () =>
      document.removeEventListener("click", followerHandleClickOutside);
  }, [followerRef]);

  // 팔로잉 팔로워 리스트 fetch
  useEffect(() => {
    if (userFollowing) {
      setFollowingCount(userFollowing.length);
      const fetchProfiles = async () => {
        const ids = userFollowing.map((f) => f.following_id);
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .in("id", ids);
        if (!error && data) setFollowingList(data);
      };
      fetchProfiles();
    }
  }, [userFollowing]);

  useEffect(() => {
    if (userFollower) {
      setFollowerCount(userFollower.length);
      const fetchProfiles = async () => {
        const ids = userFollower.map((f) => f.follower_id);
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .in("id", ids);
        if (!error && data) setFollowerList(data);
      };
      fetchProfiles();
    }
  }, [userFollower]);

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
                  onFollowChange={(newStatus) => handleFollower(newStatus)}
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
                  {followingCount}
                </div>
                <div className="text-[var(--gray-200)] text-[12px] md:text-[14px]">
                  Following
                </div>
              </button>
              {/* 팔로잉모달 */}
              {followingModal && (
                <div className="flex flex-col gap-4 absolute my-1 border border-[var(--gray-300)] z-1 rounded-lg px-5 py-4 w-70 h-55 bg-[var(--bg-color)] overflow-scroll scrollbar-hide">
                  <div className="flex justify-between items-center">
                    <div className="font-yapari text-sm text-[var(--primary-300)]">
                      Following
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setFollowingModal(false)}
                    >
                      <LucideX size={16} color="#FFFFFF" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {followingList.length > 0 &&
                      followingList
                        .filter((item, index) => {
                          return (
                            followingList.findIndex((e) => {
                              return item.id === e.id;
                            }) === index
                          );
                        })
                        .map((item) => (
                          <div
                            className="flex justify-between items-center"
                            key={item.id}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                src={item.avatar_url || defaultImg}
                                alt=""
                                className="size-6 rounded-full"
                              />
                              <div className="w-24 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                <Link
                                  to={`/user/${item.usercode}`}
                                  className="text-sm text-white"
                                >
                                  {item.username}
                                </Link>
                              </div>
                            </div>
                            <FollowButton
                              followingId={item.id}
                              onFollowChange={
                                isOwner
                                  ? (newStatus) =>
                                      handleFollowChange(item.id, newStatus)
                                  : undefined
                              }
                            />
                          </div>
                        ))}
                    {(followingList.length === 0 || !followingList) && (
                      <div className="text-center text-xs md:text-sm text-[var(--gray-200)]">
                        팔로잉 중인 유저가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
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
                  {followerCount}
                </div>
                <div className="text-[var(--gray-200)] text-[12px] md:text-[14px]">
                  Followers
                </div>
              </button>
              {/* 팔로우모달 */}
              {followerModal && (
                <div className="flex flex-col gap-4 absolute my-1 border border-[var(--gray-300)] z-1 rounded-lg px-5 py-4 w-70 h-55 bg-[var(--bg-color)] overflow-scroll scrollbar-hide">
                  <div className="flex justify-between items-center">
                    <div className="font-yapari text-sm text-[var(--primary-300)]">
                      Followers
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setFollowerModal(false)}
                    >
                      <LucideX size={16} color="#FFFFFF" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {followerList.length > 0 &&
                      followerList
                        .filter((item, index) => {
                          return (
                            followerList.findIndex((e) => {
                              return item.id === e.id;
                            }) === index
                          );
                        })
                        .map((item) => (
                          <div
                            className="flex justify-between items-center"
                            key={item.id}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                src={item.avatar_url || defaultImg}
                                alt=""
                                className="size-6 rounded-full"
                              />
                              <div className="w-24 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                <Link
                                  to={`/user/${item.usercode}`}
                                  className="text-sm text-white"
                                >
                                  {item.username}
                                </Link>
                              </div>
                            </div>
                            <FollowButton
                              followingId={item.id}
                              onFollowChange={
                                isOwner
                                  ? (newStatus) => {
                                      if (!newStatus)
                                        handleUnfollowFromFollowerList(item.id);
                                    }
                                  : undefined
                              }
                            />
                          </div>
                        ))}
                    {(followerList.length === 0 || !followerList) && (
                      <div className="text-center text-sm text-[var(--gray-200)]">
                        팔로워가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
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
