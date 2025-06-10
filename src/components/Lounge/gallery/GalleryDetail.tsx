import Button from '../../common/Button';
import backIcon from '../../../assets/icons/back.svg';
import textimage from '../../../assets/images/default-logo.svg';
import profileimage from '../../../assets/images/profile.svg';
import GalleryComment from './GalleryComment';

export default function GalleryDetail() {
  return (
    <div className="w-[768px] h-[1120px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <Button variant="back" onClick={() => window.history.back()}>
        <img src={backIcon} alt="뒤로가기" className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="w-[627px] h-[164px]flex flex-col">
        <div className="w-full h-[79px]">
          <div className="w-[241px] h-[52px] flex justify-between items-center">
            {/* 프로필 */}
            <div className="flex items-center gap-3">
              <img
                src={profileimage}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col justify-center h-full">
                <span className="font-medium text-lg">닉네임</span>
                <span className="text-lg text-[#696969]">
                  2025년 6월 1일 23:45
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[79px] text-[var(--white)]">
          {/* 제목 */}
          <div className="w-[280px] h-[24px] mb-8">
            <h3 className="text-xl font-medium truncate">제목</h3>
          </div>

          {/* 내용 */}
          <div className="w-[202px] h-[19px]">
            <p className="text-base truncate">내용</p>
          </div>
        </div>
      </div>

      <div className="w-[704px] h-[470px] bg-black mb-2">
        <img src={textimage} alt="테스트용이미지" className="w-full h-full" />
      </div>
      <div className="w-[704px] h-[293px] bg-black">
        <GalleryComment />
      </div>
    </div>
  );
}
