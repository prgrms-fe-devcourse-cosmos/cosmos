import textimage from '../../../assets/images/default-logo.svg';
import Menu from '../../common/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GalleryPost } from '../../../types/gallery';
import { GalleryPosts } from '../../../api/gallery/gallerypost';
import supabase from '../../../utils/supabase';
import GalleryDetailSkeleton from './GalleryDetailSkeleton';
import LoungeComment from '../../common/LoungeComment';
import { CommentType } from '../../common/RealtimeComments';
import { fetchCommentsByPostId } from '../../../api/comments';
import FollowButton from '../../common/FollowButton';
import { useAuthStore } from '../../../stores/authStore';
import PostLikeButton from '../../common/PostLikeButton';
import { usercodeStore } from '../../../stores/usercodeStore';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { CircleAlert, CircleCheckBig } from 'lucide-react';

export default function GalleryDetail() {
  const { postid } = useParams();
  const profileimage = '/images/cosmos/alien.svg';
  const navigate = useNavigate();
  const userData = useAuthStore((state) => state.userData);
  const [post, setPost] = useState<GalleryPost | null>(null);
  const profile = usercodeStore((state) => state.profile);
  const fetchProfile = usercodeStore((state) => state.fetchProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDeleteCompleteModal, setShowDeleteCompleteModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUserId(user?.id ?? null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!postid) return;

    const getComments = async () => {
      try {
        const comments = await fetchCommentsByPostId(parseInt(postid));
        setComments(comments);
      } catch (e) {
        console.error('gallery get Comments failed: ', e);
        setComments(null);
      }
    };
    getComments();
  }, [postid]);

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await GalleryPosts();
      const target = posts.find((p) => p.id === Number(postid));
      setPost(target ?? null);

      if (target) {
        await fetchProfile(target.profile_id);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    fetchPost();
  }, [postid, fetchProfile]);

  if (!post) {
    return;
  }

  if (isLoading) {
    return <GalleryDetailSkeleton />;
  }

  const handleEdit = () => {
    if (!postid) {
      return;
    }
    navigate(`/lounge/gallery/${postid}/edit`);
  };

  const handleDelete = async () => {
    if (!postid) return;

    try {
      // 스토리지에서 해당 post_id 폴더의 모든 파일 삭제
      const { data: fileList, error: listError } = await supabase.storage
        .from('gallery-images')
        .list(postid, {
          limit: 100,
          offset: 0,
        });

      if (listError) {
        console.error('파일 목록 조회 실패:', listError);
      } else if (fileList && fileList.length > 0) {
        // 파일이 있으면 삭제
        const filePaths = fileList.map((file) => `${postid}/${file.name}`);
        const { error: deleteStorageError } = await supabase.storage
          .from('gallery-images')
          .remove(filePaths);

        if (deleteStorageError) {
          console.error('스토리지 파일 삭제 실패:', deleteStorageError);
        }
      }

      // likes 삭제
      const { error: likesError } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', Number(postid));

      if (likesError) throw likesError;

      // gallery_images 삭제
      const { error: imagesError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('post_id', Number(postid));

      if (imagesError) throw imagesError;

      // posts 삭제
      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', Number(postid));

      if (postError) throw postError;

      setShowDeleteCompleteModal(true);
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  const openDeleteModal = () => {
    setShowConfirmDeleteModal(true);
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

  const isOwner = userData?.id === post.profile_id;

  return (
    <>
      <div className="w-full min-h-fit bg-[#141414]/80 flex flex-col  p-4 sm:p-6 md:px-8 gap-2">
        {/* 뒤로가기버튼 */}
        <div className="group">
          <Button
            variant="back"
            className="text-xs lg:text-base"
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
        </div>

        <div className="w-full  mx-auto flex flex-col gap-6 px-4">
          {/* 프로필 영역 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={profile?.avatar_url || profileimage}
                alt="프로필"
                className="size-7 sm:w-[40px] sm:h-[40px] lg:size-10 rounded-full cursor-pointer"
                onClick={() => navigate(`/user/${profile?.usercode}`)}
              />
              <div className="flex flex-col justify-center">
                <span className="font-medium text-xs sm:text-sm lg:text-base">
                  {profile?.username}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm text-[var(--gray-300)]">
                  {formatDateTime(post.created_at)}
                </span>
              </div>
            </div>

            {isOwner ? (
              <Menu
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                className="-mt-8"
              />
            ) : (
              <FollowButton followingId={post.profile_id} />
            )}
          </div>

          {/* 제목 + 내용 */}
          <div className="text-[var(--white)]">
            <h3 className="text-sm md:text-lg font-medium mb-4 break-words">
              {post.title}
            </h3>
            <p className="text-xs md:text-base whitespace-pre-wrap break-words">
              {post.content}
            </p>
          </div>

          {/* 이미지 */}
          <div className="w-full h-[300px] aspect-[4/3] sm:aspect-[5/4] md:aspect-[3/2] lg:aspect-[16/9] flex justify-center items-center overflow-hidden">
            <img
              src={post.gallery_images?.image_url || textimage}
              alt={post.title}
              className=" h-full object-cover"
            />
          </div>
          <LoungeComment
            postId={postid!}
            userId={currentUserId!}
            comments={comments}
            likeButton={
              <PostLikeButton
                postId={post.id!}
                initialCount={post.like_count}
              />
            }
          />
        </div>
      </div>
      {showConfirmDeleteModal && (
        <Modal
          icon={<CircleAlert size={40} color="#EF4444" />}
          title="정말 삭제하시겠습니까?"
          description="삭제 후 복구가 불가능합니다."
          confirmButtonText="DELETE"
          cancelButtonText="CANCEL"
          onConfirm={async () => {
            // 모달을 끔
            setShowConfirmDeleteModal(false);
            // 삭제 실행
            await handleDelete();
          }}
          onCancel={() => setShowConfirmDeleteModal(false)}
        />
      )}
      {showDeleteCompleteModal && (
        <Modal
          icon={<CircleCheckBig size={40} color="var(--primary-300)" />}
          title="게시글이 삭제되었습니다."
          confirmButtonText="OK"
          onConfirm={() => {
            setShowConfirmDeleteModal(false);
            navigate('/lounge/gallery');
          }}
        />
      )}
    </>
  );
}
