import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types/daily";
import { useTranslate } from "../../hooks/useTranslate";
import { useState } from "react";

export default function DailySpaceimage() {
  const { nasa } = useLoaderData() as LoaderData;
  const [showTranslation, setShowTranslation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { translation: translation, isLoading } = useTranslate(
    nasa.explanation,
    nasa.date
  );

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-lg md:text-2xl  mb-8 sm:mb-15">
        IMAGE OF THE DAY
      </h1>
      <div
        className="
          flex mx-auto 
          flex-col sm:flex-row
          w-[270px] sm:w-[540px] md:w-[640px] lg:w-[880px] xl:w-[1080px]
          h-[610px] sm:h-[292px] md:h-[500px] xl:h-[583px]
        "
      >
        {/* 오른쪽 이미지 */}
        <div className="w-full h-1/2 sm:w-1/2 sm:h-full bg-[rgba(255,255,255,0.09)] flex justify-start items-center relative">
          {nasa.media_type === "image" && (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse">
                  <div className="h-full bg-gray-500 rounded w-full"></div>
                </div>
              )}
              <a
                href="https://apod.nasa.gov/apod/astropix.html"
                target="_blank"
                className="w-full h-full block"
              >
                <img
                  src={nasa.url}
                  alt={nasa.title || "나사이미지 제목이없습니다."}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover ${
                    !imageLoaded ? "invisible" : ""
                  }`}
                />
              </a>
            </>
          )}

          {nasa.media_type !== "image" && (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-center">이미지가 없습니다.</h1>
            </div>
          )}
        </div>
        {/* 왼쪽 내용 */}
        <div className="w-full sm:w-1/2 md:h-full bg-[rgba(255,255,255,0.09)] text-[var(--white)] flex flex-col items-start px-6 py-6 md:px-12 md:py-12">
          <div className=" h-full w-full flex flex-col justify-between">
            <h1 className="lg:text-2xl md:text-xl text-sm font-medium mb-2 md:mb-5">
              {nasa.title}
            </h1>
            {showTranslation ? (
              <>
                <div className="flex-1">
                  {isLoading ? (
                    <div className="space-y-2 animate-pulse w-full">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm xl:text-base line-clamp-10 md:line-clamp-12 xl:line-clamp-14 whitespace-pre-wrap leading-5 md:leading-6 lg:leading-7 tracking-wide">
                      {translation ? translation : "API를 불러오지 못했습니다."}
                    </p>
                  )}
                </div>
                <div className="w-full flex justify-end ">
                  <button
                    onClick={() => setShowTranslation(false)}
                    className="text-[10px] md:text-xs lg:text-sm xl:text-base text-[color:var(--gray-200)] cursor-pointer mt-1"
                  >
                    원문보기
                  </button>{" "}
                </div>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <p className="text-xs lg:text-base line-clamp-10 md:line-clamp-11 xl:line-clamp-14 whitespace-pre-wrap leading-5 md:leading-6 lg:leading-7 tracking-wide">
                    {nasa.explanation}
                  </p>
                </div>
                <div className="w-full flex justify-end ">
                  <button
                    onClick={() => setShowTranslation(true)}
                    className="text-[10px] md:text-xs lg:text-sm xl:text-base text-[color:var(--gray-200)] cursor-pointer mt-1"
                  >
                    번역보기
                  </button>{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
