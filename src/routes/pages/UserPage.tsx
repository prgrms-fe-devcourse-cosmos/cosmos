import { useLocation, useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useEffect, useRef, useState } from 'react';
import supabase from '../../utils/supabase';
import EditProfileModal from '../../components/userpage/EditProfileModal';
import UserHeader from '../../components/userpage/UserHeader';
import UserBio from '../../components/userpage/UserBio';
import PostViewTabs from '../../components/userpage/PostViewTabs';
import UserPostList from '../../components/userpage/UserPostList';
import FollowerPostList from '../../components/userpage/FollowerPostList';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function UserPage() {
  const code = useParams().code;
  const location = useLocation();
  const { userData: currentUser } = useAuthStore();
  const [activeTab, setActvieTab] = useState<'posts' | 'followers'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Profile | null>(null);
  const [userPostList, setUserPostList] = useState<Post[] | null>(null);
  const [userFollower, setUserFollower] = useState<Follow[] | null>(null);
  const [userFollowing, setUserFollowing] = useState<Follow[] | null>(null);
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
      document.addEventListener('mousedown', outsideClickHandler);
    }
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  }, [isEditModalOpen, setIsEditModalOpen]);

  useEffect(() => {
    setIsLoading(true);
    supabase
      .from('profiles')
      .select('*')
      .eq('usercode', code!)
      .then((data) => {
        setUserData(data.data![0]);
        setIsLoading(false);
      });
  }, [location]);

  useEffect(() => {
    if (userData) {
      // Posts
      supabase
        .from('posts')
        .select('*')
        .eq('profile_id', userData.id)
        .then((data) => setUserPostList(data.data));
      // Following
      supabase
        .from('follows')
        .select('*')
        .eq('follower_id', userData.id)
        .then((data) => setUserFollowing(data.data));
      // Follower
      supabase
        .from('follows')
        .select('*')
        .eq('following_id', userData.id)
        .then((data) => setUserFollower(data.data));
    }
  }, [userData]);

  if (isLoading || !userData) return <LoadingSpinner />;

  return (
    <div className="w-screen h-[88vh] px-[3vw] md:px-[10vw] py-10 flex">
      <div className="hidden md:flex md:w-[30%] flex-col">
        {isOwner ? (
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
          isOwner={isOwner}
          userData={userData}
          followingCount={userFollowing ? userFollowing.length : 0}
          followerCount={userFollower ? userFollower.length : 0}
          postCount={userPostList ? userPostList.length : 0}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <UserBio userData={userData} />

        <div className="flex flex-col gap-3 h-full">
          <PostViewTabs
            isOwner={code === currentUser?.usercode}
            activeTab={activeTab}
            setActiveTab={setActvieTab}
          />

          {activeTab === 'posts' ? (
            <UserPostList posts={userPostList} />
          ) : (
            <FollowerPostList />
          )}
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
              setIsEditModalOpen={setIsEditModalOpen}
              setUserData={setUserData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
