import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { LoaderData } from "../../types/daily";
import { useLoaderData } from "react-router-dom";
import NewsCard from "./NewsCard";

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
              <NewsCard article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
