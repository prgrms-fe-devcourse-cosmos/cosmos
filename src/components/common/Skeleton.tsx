export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-700 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}
