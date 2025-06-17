import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import supabase from '../../utils/supabase';
import { LucideX } from 'lucide-react';
import FollowButton from '../common/FollowButton';
import { Link } from 'react-router-dom';

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
  const defaultImg = '/images/cosmos/alien.svg';

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
    document.addEventListener('click', followingHandleClickOutside);
    return () =>
      document.removeEventListener('click', followingHandleClickOutside);
  }, [followingRef]);

  useEffect(() => {
    document.addEventListener('click', followerHandleClickOutside);
    return () =>
      document.removeEventListener('click', followerHandleClickOutside);
  }, [followerRef]);

  useEffect(() => {
    if (userFollowing) {
      for (let i = 0; i < userFollowing.length; i++) {
        supabase
          .from('profiles')
          .select()
          .eq('id', userFollowing[i].following_id)
          .then((data) => setFollowingList((prev) => [...prev, data.data![0]]));
      }
    }
  }, [userFollowing]);

  useEffect(() => {
    if (userFollower) {
      for (let i = 0; i < userFollower.length; i++) {
        supabase
          .from('profiles')
          .select()
          .eq('id', userFollower[i].follower_id)
          .then((data) => setFollowerList((prev) => [...prev, data.data![0]]));
      }
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
          className="size-[80px] md:size-[90px] lg:size-[120px] rounded-full aspect-square object-cover object-center"
        />
        <div className="w-full ml-2 lg:ml-4">
          <div className="flex justify-between items-center mb-2 md:mb-2 lg:mb-4">
            {/* 유저이름 */}
            <div className="pl-2.5 md:pl-3 lg:pl-5 text-white text-[18px] md:text-[20px] font-bold">
              {userData?.username}
            </div>
            {/* 본인o editprofile / 본인x follow */}
            <div>
              {isOwner ? (
                <Button
                  className="py-1.5 md:py-2 w-[130px] md:w-[180px] lg:w-[200px] text-[10px] md:text-xs"
                  onClick={onEditClick}
                >
                  Edit<span className="hidden md:block"> Profile</span>
                </Button>
              ) : (
                // 팔로우버튼
                <FollowButton
                  followingId={userData.id}
                  className="py-1.5 md:py-2 w-[130px] md:w-[180px] lg:w-[200px] text-[10px] md:text-xs "
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
                  {userFollowing ? userFollowing.length : 0}
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
                              className="text-[6px] sm:text-[6px] lg:text-[6px] w-24 sm:w-24 lg:w-24 h-7 p-0"
                            />
                          </div>
                        ))}
                    {(followingList.length === 0 || !followingList) && (
                      <div className="text-center text-sm text-[var(--gray-200)]">
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
                  {userFollower ? userFollower.length : 0}
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
                      Follower
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
                              className="text-[6px] sm:text-[6px] lg:text-[6px] w-24 sm:w-24 lg:w-24 h-7 p-0"
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
