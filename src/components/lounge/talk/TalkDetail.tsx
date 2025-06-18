import { useNavigate, useParams } from 'react-router-dom';
import LoungeComment from '../../common/LoungeComment';
import { useEffect, useState } from 'react';
import { useTalkStore } from '../../../stores/talkStore';
import FollowButton from '../../common/FollowButton';
import TalkDetailSkeleton from './TalkDetailSkeleton';
import Menu from '../../common/Menu';
import supabase from '../../../utils/supabase';
import { deleteTalkPostById } from '../../../api/talk/talk';
import { fetchCommentsByPostId } from '../../../api/comments';
import { CommentType } from '../../common/RealtimeComments';
import PostLikeButton from '../../common/PostLikeButton';
import { usercodeStore } from '../../../stores/usercodeStore';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { CircleAlert } from 'lucide-react';

export default function TalkDetail() {
  const navigate = useNavigate();
  const profileImage = '/images/cosmos/alien.svg';
  // useParams ID 받기
  const { id } = useParams();
  const [comments, setComments] = useState<CommentType[] | null>(null);

  const { selectedPost, fetchPostById, loading, setSelectedPost } =
    useTalkStore();

  // usercodeStore에서 프로필 불러오기
  const { profile, fetchProfile } = usercodeStore();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedPost?.profile_id) {
      fetchProfile(selectedPost.profile_id);
    }
  }, [selectedPost?.profile_id, fetchProfile]);

  useEffect(() => {
    if (!selectedPost) return;

    const postId = selectedPost.id;
    const getComments = async () => {
      try {
        const comments = await fetchCommentsByPostId(postId!);
        setComments(comments);
      } catch (error) {
        console.error('getComments 실패 : ', error);
        setComments(null);
      }
    };
    getComments();
  }, [selectedPost]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUserId(user?.id ?? null);
    };

    fetchUser();
  }, []);

  // 게시글 fetch
  useEffect(() => {
    if (id) {
      // number로 변환하여 전달
      fetchPostById(Number(id));
    }

    return () => {
      setSelectedPost(null); // 언마운트 시 상태 초기화
    };
  }, [id]);

  // 날짜 포맷 추가
  function formatKoreanDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${day} ${time}`;
  }

  // 로딩 중 스켈레톤
  if (loading) {
    return <TalkDetailSkeleton />;
  }

  // 게시글 못 찾은 경우
  if (!selectedPost) {
    return (
      <p className="text-center mt-10 text-red-500">
        게시글을 찾을 수 없습니다.
      </p>
    );
  }

  // 게시글 삭제
  const handleDelete = async () => {
    if (!postId) return;

    try {
      const { success, message } = await deleteTalkPostById(postId);

      if (!success) {
        console.error('게시글 삭제 실패:', message);
        return;
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const {
    created_at,
    title,
    content,
    id: postId,
    username,
    avatar_url,
    profile_id,
  } = selectedPost;

  return (
    <div className="w-full p-4 min-h-fit sm:p-6 md:px-8 bg-[#141414]/80 ">
      <div className="wrapper">
        {/* 뒤로가기버튼 */}
        <div className="group mb-2">
          <Button
            variant="back"
            className="text-xs lg:text-base"
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
        </div>

        <div className="w-full  mx-auto flex flex-col gap-6 px-4">
          {/* 유저정보 + 게시글 등록 날짜 + 팔로우버튼/메뉴버튼 */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3  items-center">
              {/* 유저아이콘 */}
              <img
                src={avatar_url || profileImage}
                alt="유저프로필"
                className="size-7 sm:w-[40px] sm:h-[40px] lg:size-10 rounded-full object-cover cursor-pointer"
                onClick={() => navigate(`/user/${profile?.usercode}`)}
              />
              {/* 유저이름, 게시글 등록 날짜 */}
              <div className="flex flex-col justify-center">
                <h3 className="font-medium text-xs sm:text-sm lg:text-base">
                  {username}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--gray-300)]">
                  {formatKoreanDate(created_at!)}
                </p>
              </div>
            </div>
            {/* 팔로우버튼 or 메뉴버튼 */}
            {/* 게시글 작성한 사람의 프로필id props 전달 */}
            {profile_id === currentUserId ? (
              <Menu
                onEdit={() => navigate(`/lounge/talk/${selectedPost?.id}/edit`)}
                onDelete={() => setShowConfirmDeleteModal(true)}
              />
            ) : (
              profile_id && <FollowButton followingId={profile_id} />
            )}
          </div>

          {/* 게시글 */}
          <section className="text-[var(--white)]">
            {/* 제목 */}
            <h3 className="text-sm md:text-lg font-medium mb-4 break-words">
              {title}
            </h3>

            {/* 내용 */}
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-base whitespace-pre-wrap break-words min-h-50">
                {content}
              </p>
            </div>

            {/* 댓글 */}
            <LoungeComment
              postId={String(selectedPost.id)}
              userId={currentUserId!}
              comments={comments}
              likeButton={
                <PostLikeButton
                  postId={selectedPost.id!}
                  initialCount={selectedPost.like_count}
                />
              }
            />
            
            {showConfirmDeleteModal && (
              <Modal
                icon={<CircleAlert size={32} color="var(--red)" />}
                title="정말 삭제하시겠습니까?"
                description="삭제 후 복구가 불가능합니다."
                confirmButtonText="DELETE"
                cancelButtonText="CANCEL"
                onConfirm={async () => {
                  setShowConfirmDeleteModal(false);
                  await handleDelete();
                  navigate('/lounge/talk');
                }}
                onCancel={() => setShowConfirmDeleteModal(false)}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
