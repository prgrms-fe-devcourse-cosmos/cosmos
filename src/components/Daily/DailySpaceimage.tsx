import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types/daily";
import { useTranslate } from "../../hooks/useTranslate";

export default function DailySpaceimage() {
  const { nasa } = useLoaderData() as LoaderData;
  const { translation: translation, isLoading } = useTranslate(
    nasa.explanation
  );

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-2xl mb-8 sm:mb-15">
        IMAGE OF THE DAY
      </h1>
      <div
        className="
          flex mx-auto 
          flex-col sm:flex-row
          w-[270px] sm:w-[540px] md:w-[880px] lg:w-[1080px]
          h-[610px] sm:h-[292px] md:h-[583px]
        "
      >
        {/* 오른쪽 이미지 */}
        <div className="w-full h-1/2 sm:w-1/2 sm:h-full bg-[rgba(255,255,255,0.09)] flex justify-start items-center">
          {nasa.media_type === "image" ? (
            <img
              src={nasa.url}
              alt={nasa.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-center">이미지가 없습니다.</h1>
            </div>
          )}
        </div>
        {/* 왼쪽 내용 */}
        <div className="w-full h-1/2 sm:w-1/2 sm:h-full bg-[rgba(255,255,255,0.09)] text-[var(--white)] flex flex-col justify-start items-start px-12">
          <div className="my-5  md:my-12  w-full">
            <h1 className="md:text-xl text-sm font-bold mb-2 md:mb-5">
              {nasa.title}
            </h1>
            {isLoading ? (
              <div className="space-y-2 animate-pulse w-full">
                <div className="h-4 bg-gray-500 rounded w-full"></div>
              </div>
            ) : (
              <p className="text-xs md:text-base line-clamp-12 md:line-clamp-18 whitespace-pre-wrap leading-normal">
                {translation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
