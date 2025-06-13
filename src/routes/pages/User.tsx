import { Link, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import defaultImg from "../../assets/images/profile.svg";
import { LucideHeart, LucideMessageSquare } from "lucide-react";

export default function User() {
  const code = useParams().code;
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState<ProfileType>();
  const [postTab, setPostTab] = useState(true);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("*")
      .eq("usercode", code!)
      .then((data) => setUserData(data.data![0]));
  }, [location]);

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
        <div className="flex gap-2 md:gap-6 items-center">
          <img
            src={
              userData?.avatar_url && userData?.avatar_url.length > 0
                ? userData?.avatar_url
                : defaultImg
            }
            alt="profileImage"
            className="rounded-full size-22"
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-3 ml-3">
              <div className="text-white text-[28px] font-bold">
                {userData?.username}
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-white font-medium">88</div>
                  <div className="text-[var(--gray-200)]">Following</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-white font-medium">111</div>
                  <div className="text-[var(--gray-200)]">Followers</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-white font-medium">9</div>
                  <div className="text-[var(--gray-200)]">Posts</div>
                </div>
              </div>
            </div>
            <div>
              {code === currentUser?.usercode ? (
                <Link
                  to="/"
                  className="absolute right-[3vw] md:right-[10vw] rounded-lg w-40 py-1 text-sm hover:font-medium text-[var(--primary-300)] hover:text-black hover:bg-[var(--primary-300)] font-yapari border border-[var(--primary-300)] text-center"
                >
                  Edit Profile
                </Link>
              ) : (
                <button className="absolute right-[3vw] md:right-[10vw] rounded-lg w-40 py-1 text-sm hover:font-medium text-[var(--primary-300)] hover:text-black hover:bg-[var(--primary-300)] font-yapari border border-[var(--primary-300)] cursor-pointer">
                  + Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="min-h-15 mt-2">
          <div className=" border-l border-[var(--primary-300)] pl-5">
            {userData?.bio ? userData?.bio : "채널 소개문이 없습니다."}
          </div>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex">
            <button
              type="button"
              className="w-full text-center py-2.5 border-b border-b-[#00000000] disabled:border-b-[var(--primary-300)] font-yapari text-[var(--gray-200)] disabled:text-[var(--primary-300)] cursor-pointer disabled:cursor-default"
              disabled={postTab}
              onClick={() => setPostTab(true)}
            >
              POSTS
            </button>
            {code === currentUser?.usercode && (
              <button
                type="button"
                className="w-full text-center py-2.5 border-b border-b-[#00000000] disabled:border-b-[var(--primary-300)] font-yapari text-[var(--gray-200)] disabled:text-[var(--primary-300)] cursor-pointer disabled:cursor-default"
                disabled={!postTab}
                onClick={() => setPostTab(false)}
              >
                FOLLOWERS
              </button>
            )}
          </div>
          {postTab && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <span>게시글 제목</span>
                  <span className="flex gap-1 items-center text-[12px] text-[var(--gray-200)]">
                    <LucideMessageSquare size="12" color="var(--gray-200)" />
                    23
                  </span>
                </div>
                <div className="flex items-center justify-between w-[45%] max-w-80">
                  <div className="flex text-sm justify-baseline items-center w-[15%] gap-1.5">
                    <span>
                      <LucideHeart size={12} />
                    </span>
                    <span>6</span>
                  </div>
                  <div className="text-sm text-center w-[45%]">
                    Stargazer Gallery
                  </div>
                  <div className="text-sm text-[var(--gray-200)] text-end">
                    2025-06-04
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                  <span>두번째 게시글 제목입니다~</span>
                  <span className="flex gap-1 items-center text-[12px] text-[var(--gray-200)]">
                    <LucideMessageSquare size="12" color="var(--gray-200)" />8
                  </span>
                </div>
                <div className="flex items-center justify-between w-[45%] max-w-80">
                  <div className="flex text-sm justify-baseline items-center w-[15%] gap-1.5">
                    <span>
                      <LucideHeart size={12} />
                    </span>
                    <span>123</span>
                  </div>
                  <div className="text-sm text-center w-[45%]">Cosmo Talk</div>
                  <div className="text-sm text-[var(--gray-200)] text-end">
                    2025-06-14
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
