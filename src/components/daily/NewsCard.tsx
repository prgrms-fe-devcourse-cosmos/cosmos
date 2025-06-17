import { Article } from "../../types/daily";

export default function NewsCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[270px] sm:w-[270px] h-[260px] md:w-[280px] md:h-[370px] xl:w-[300px] bg-[rgba(255,255,255,0.09)] cursor-pointer"
    >
      {/* 뉴스 이미지 */}
      <img
        src={article.image_url}
        alt={article.title}
        className="w-full h-[133px] md:h-[200px] object-cover"
      />

      {/* 뉴스 내용 요약 */}
      <div className="py-3 md:py-4 pl-4 pr-8 h-[124px] md:h-[170px] flex flex-col justify-start gap-2">
        <h2 className="text-sm md:text-base font-medium line-clamp-1 text-[var(--white)]">
          {article.title}
        </h2>
        <p className="text-[10px] md:text-xs line-clamp-4 md:line-clamp-5 text-[#c7c7c7] leading-4 md:leading-5">
          {article.translatedSummary}
        </p>
      </div>
    </a>
  );
}
