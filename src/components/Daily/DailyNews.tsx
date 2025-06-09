import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { LoaderData } from '../../types/types';
import { useLoaderData } from 'react-router-dom';

export default function DailyNews() {
  const { news } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-2xl mb-10 sm:mb-17">
        Space News
      </h1>
      <div
        className="w-[236px] sm:w-[680px] md:w-[880px] lg:w-[1080px]
          h-[247px] md:h-[370px]"
      >
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { spaceBetween: 20, slidesPerView: 3 },
            768: { spaceBetween: 60, slidesPerView: 3 },
            1024: { spaceBetween: 80, slidesPerView: 3 },
          }}
        >
          {news.map((article) => (
            <SwiperSlide key={article.id}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[230px] sm:w-[200px] h-[247px] md:w-[260px] md:h-[370px] lg:w-[300px] bg-white/10 backdrop-blur-sm cursor-pointer"
              >
                {/* 뉴스 이미지 */}
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-[133px] md:h-[200px] object-cover"
                />

                {/* 뉴스 내용 요약 */}
                <div className="py-2 md:py-6 pl-4 pr-8 h-[114px] md:h-[170px] flex flex-col justify-start gap-2">
                  <h2 className="text-base md:text-lg font-semibold line-clamp-1 text-[var(--white)]">
                    {article.title}
                  </h2>
                  <p className="text-xs md:text-sm line-clamp-4 text-[#c7c7c7]">
                    {article.summary}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
