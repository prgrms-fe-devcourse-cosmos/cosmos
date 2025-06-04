import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { LoaderData } from '../../types/types';
import { useLoaderData } from 'react-router-dom';

export default function DailyNews() {
  const { news } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-2xl mb-17">
        Space News
      </h1>
      <div className="w-[1080px] h-[370px]">
        <Swiper spaceBetween={80} slidesPerView={3} freeMode={true}>
          {news.map((article) => (
            <SwiperSlide key={article.id} style={{ width: '300px' }}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[300px] h-[370px] overflow-hidden bg-white/10 backdrop-blur-sm"
              >
                {/* 뉴스 이미지 */}
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-[200px] object-cover"
                />

                {/* 뉴스 내용 요약 */}
                <div className="py-6 pl-4 pr-8 h-[170px] flex flex-col justify-start gap-2">
                  <h2 className="text-lg font-semibold line-clamp-1 text-[var(--white)]">
                    {article.title}
                  </h2>
                  <p className="text-sm line-clamp-4 text-[#c7c7c7]">
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
