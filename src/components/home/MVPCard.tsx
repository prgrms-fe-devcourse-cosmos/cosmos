export default function MVPCard({
  title,
  content,
  imgSrc,
}: {
  title: string;
  content: string;
  imgSrc: string;
}) {
  return (
    <div className="size-60 md:size-50 lg:size-70 xl:size-80  space-y-8">
      <div className="imgBox size-full">
        <img src={imgSrc} loading="lazy" className=" size-full object-cover" />
      </div>

      <div className="textBox flex flex-col gap-2">
        <span className="text-2xl font-medium ">{title}</span>
        <span className="text-[color:var(--gray-200)]">{content}</span>
      </div>
    </div>
  );
}
