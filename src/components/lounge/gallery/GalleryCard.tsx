import { useNavigate } from 'react-router-dom';
import heartIcon from '../../../assets/icons/heart.svg';
import textimage from '../../../assets/images/green-logo.svg';

export default function GalleryCard() {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/lounge/gallery/id`)}
        className="w-[340px] h-[343px] flex flex-col cursor-pointer"
      >
        <div className="w-full h-[227px]">
          <img
            src={textimage}
            alt="이미지 제목"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[4px] text-[var(--white)] 
        bg-[rgba(255,255,255,0.09)] border-r-[1px] border-b-[1px] border-l-[1px] border-[rgba(255,255,255,0.1)]"
        >
          <h3 className="text-base truncate font-bold">Post Title</h3>
          <p className="text-sm">photo by. User</p>
          <div className="flex justify-between">
            <p className="text-xs text-[#909090]">2025.06.01</p>
            <p className="text-[10px] flex gap-2 items-center">
              <img src={heartIcon} className="w-3 h-3" alt="좋아요" />
              <span>10</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
