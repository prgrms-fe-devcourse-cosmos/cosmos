import PageListItem from "./PageListItem";

export default function AboutNav() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">About</span>
      <div className="w-30 flex flex-col items-start text-[color:var(--gray-200)]">
        <PageListItem name="Contact" route="/contact" />
      </div>
    </div>
  );
}
