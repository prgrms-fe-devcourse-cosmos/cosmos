import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { LoaderData } from "../../types/daily";
import { useLoaderData } from "react-router-dom";
import NewsCard from "./NewsCard";

export default function DailyNews() {
  const { news } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-lg md:text-2xl mb-10 sm:mb-17">
        Space News
      </h1>
      <div
        className="w-[270px] sm:w-[540px] md:w-[640px] lg:w-[920px] xl:w-[1080px]
          h-[247px] md:h-[370px]"
      >
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { spaceBetween: 20, slidesPerView: 2 },
            768: { spaceBetween: 40, slidesPerView: 2 },
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
