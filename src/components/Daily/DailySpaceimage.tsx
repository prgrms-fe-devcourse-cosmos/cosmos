import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types/types';

export default function DailySpaceimage() {
  const { nasa } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-2xl mb-17">
        IMAGE OF THE DAY
      </h1>
      <div className="w-[1080px] h-[583px] flex mx-auto">
        {/* 오른쪽 이미지 */}
        <div className="w-[540px] h-full bg-[var(--white)]/10 backdrop-blur-xl flex justify-start items-center">
          {nasa.media_type === 'image' ? (
            <img
              src={nasa.url}
              alt={nasa.title}
              className="w-[476px] h-full object-cover shadow-md"
            />
          ) : (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-center">이미지가 없습니다.</h1>
            </div>
          )}
        </div>
        {/* 왼쪽 내용 */}
        <div className="w-[540px] h-full bg-[var(--white)]/10 backdrop-blur-xl text-[var(--white)] flex flex-col justify-start items-start">
          <div className="my-20 mr-15">
            <h1 className="text-2xl font-bold mb-8">{nasa.title}</h1>
            <p className="whitespace-pre-wrap leading-normal">
              {nasa.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
