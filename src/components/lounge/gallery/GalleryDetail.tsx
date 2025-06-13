import Button from '../../common/Button';
import backIcon from '../../../assets/icons/back.svg';
import textimage from '../../../assets/images/default-logo.svg';
import profileimage from '../../../assets/images/profile.svg';
import GalleryComment from './GalleryComment';
import Menu from '../../common/Menu';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GalleryPost } from '../../../types/gallery';
import { GalleryPosts } from '../../../api/gallery/gallerypost';
import supabase from '../../../utils/supabase';
import GalleryDetailSkeleton from './GalleryDetailSkeleton';

export default function GalleryDetail() {
  const { postid } = useParams();
  const [post, setPost] = useState<GalleryPost | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await GalleryPosts();
      const target = posts.find((p) => p.id === Number(postid));
      setPost(target ?? null);

      // 프로필 정보 가져오기
      if (target) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', target.profile_id)
          .single();

        if (error) {
          console.error('프로필 로드 실패:', error.message);
        } else {
          setProfile(data);
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fetchPost();
  }, [postid]);

  if (!post) {
    return <div>존재하지 않는 게시글입니다.</div>;
  }

  if (isLoading) {
    return <GalleryDetailSkeleton />;
  }

  const handleEdit = () => {
    alert('수정 클릭');
  };

  const handleDelete = () => {
    alert('삭제 클릭');
  };

  function formatDateTime(datetimeString: string) {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}년 ${String(
      date.getMonth() + 1
    ).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
    const formattedTime = date.toLocaleTimeString('ko-KR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="w-[768px] h-[1120px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <Button variant="back" onClick={() => window.history.back()}>
        <img src={backIcon} alt="뒤로가기" className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="w-[680px] h-[164px] flex flex-col">
        <div className="w-full h-[79px]">
          <div className="w-full h-[52px] flex justify-start items-center">
            {/* 프로필 */}
            <div className="flex items-center gap-3">
              <img
                src={profile?.avatar_url || profileimage}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col justify-center h-full">
                <span className="font-medium text-lg">{profile?.username}</span>
                <span className="text-lg text-[#696969]">
                  {formatDateTime(post.created_at)}
                </span>
              </div>
            </div>
            <Menu
              onEdit={handleEdit}
              onDelete={handleDelete}
              className="ml-auto self-start mt-[-15px]"
            />
          </div>
        </div>

        <div className="w-full h-[79px] text-[var(--white)] mt-3">
          {/* 제목 */}
          <div className="w-[280px] h-[24px] mb-8">
            <h3 className="text-xl font-medium truncate">{post.title}</h3>
          </div>

          {/* 내용 */}
          <div className="w-[202px] h-[19px]">
            <p className="text-base truncate">{post.content}</p>
          </div>
        </div>
      </div>

      <div className="w-[704px] h-[470px] mb-2">
        <img
          src={post.gallery_images?.image_url || textimage}
          alt={post.title}
          className="w-full h-full"
        />
      </div>
      <div className="w-[704px] h-[293px] bg-amber-50">
        <GalleryComment />
      </div>
    </div>
  );
}
