import { useNavigate, useParams } from 'react-router-dom';
import LoungeComment from '../../common/LoungeComment';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import profileImage from '../../../assets/images/profile.svg';
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

export default function TalkDetail() {
  const navigate = useNavigate();
  // useParams ID 받기
  const { id } = useParams();
  const [comments, setComments] = useState<CommentType[] | null>(null);

  const { selectedPost, fetchPostById, loading, setSelectedPost } =
    useTalkStore();

  // usercodeStore에서 프로필 불러오기
  const { profile, fetchProfile } = usercodeStore();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
    // 삭제 여부 확인
    const confirmed = window.confirm('정말 게시글을 삭제하시겠습니까?');

    // 취소한 경우 종료
    if (!confirmed) return;

    // 예외처리) postId 없는 경우
    if (!postId) {
      alert('삭제할 게시글이 없습니다.');
      return;
    }

    // supabase 해당 ID의 게시글 삭제
    const { success, message } = await deleteTalkPostById(postId);

    // 삭제 중 오류 발생 하면 콘솔
    if (!success) {
      console.error('게시글 삭제 실패:', message);
      alert(message);
      return;
    }

    // 삭제 성공 -> 게시글 목록 페이지로 이동
    alert('게시글이 삭제되었습니다.');
    navigate('/lounge/talk');
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
    <div className="px-8 py-6 bg-[#141414]/80">
      <div className="wrapper">
        {/* 뒤로가기버튼 */}
        <div className="mb-5 md:mb-8">
          <button
            type="button"
            className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-[14px]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" /> BACK
          </button>
        </div>
        {/* 유저정보 + 게시글 등록 날짜 + 팔로우버튼/메뉴버튼 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 lg:gap-[22px] items-center">
            {/* 유저아이콘 */}
            <img
              src={avatar_url || profileImage}
              alt="유저프로필"
              className="w-9 md:w-10 h-9 md:h-10 rounded-full object-cover cursor-pointer"
              onClick={() => navigate(`/user/${profile?.usercode}`)}
            />
            {/* 유저이름, 게시글 등록 날짜 */}
            <div>
              <h3 className="font-semibold text-sm md:text-[16px]">
                {username}
              </h3>
              <p className="text-[#696969] font-light text-xs md:text-sm">
                {formatKoreanDate(created_at!)}
              </p>
            </div>
          </div>
          {/* 팔로우버튼 or 메뉴버튼 */}
          {/* 게시글 작성한 사람의 프로필id props 전달 */}
          {profile_id === currentUserId ? (
            <Menu
              onEdit={() => navigate(`/lounge/talk/${selectedPost?.id}/edit`)}
              onDelete={handleDelete}
            />
          ) : (
            profile_id && <FollowButton followingId={profile_id} />
          )}
        </div>

        {/* 게시글 */}
        <section>
          {/* 제목 */}
          <h3 className="mt-6 md:mt-7 mb-7 md:mb-8 font-medium text-[16px] md:text-[20px]">
            {title}
          </h3>

          {/* 내용 */}
          <div className="mb-6 md:mb-8">
            <p className="whitespace-pre-line min-h-[120px] text-sm md:text-[16px]">
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
        </section>
      </div>
    </div>
  );
}
