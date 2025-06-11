import { useNavigate } from 'react-router-dom';
import heartIcon from '../../../assets/icons/heart.svg';
import heartfilledIcon from '../../../assets/icons/filled_heart.svg';
import GalleryLike from './GalleryLike';
import { userStore } from '../../../stores/userStore';

interface GalleryCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    gallery_images: { image_url: string } | null;
  };
}

export default function GalleryCard({ post }: GalleryCardProps) {
  const navigate = useNavigate();
  const uid = userStore((state) => state.uid);

  const thumbnail = post.gallery_images?.image_url || '';
  return (
    <>
      <div
        onClick={() => navigate(`/lounge/gallery/${post.id}`)}
        className="w-[340px] h-[343px] flex flex-col cursor-pointer"
      >
        <div className="w-full h-[227px]">
          <img
            src={thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[4px] text-[var(--white)] 
        bg-[rgba(255,255,255,0.09)] border-r-[1px] border-b-[1px] border-l-[1px] border-[rgba(255,255,255,0.1)]"
        >
          <h3 className="text-base truncate font-bold">{post.title}</h3>
          <p className="text-sm">{post.content}</p>
          <div className="flex justify-between">
            <p className="text-xs text-[#909090]">
              {new Date(post.created_at).toLocaleDateString('ko-KR')}
            </p>
            <div className="text-[10px] flex gap-2 items-center">
              <GalleryLike
                postId={post.id}
                profileId={uid || ''}
                IconLiked={
                  <img
                    src={heartfilledIcon}
                    alt="좋아요됨"
                    className="w-5 h-5"
                  />
                }
                IconNotLiked={
                  <img src={heartIcon} alt="좋아요안됨" className="w-5 h-5" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
