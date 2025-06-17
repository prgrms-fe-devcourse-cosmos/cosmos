import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

export default function Menu({ onEdit, onDelete, className = "" }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-2xl font-bold w-15 px-1 py-1 cursor-pointer"
        aria-label="메뉴 열기"
      >
        <Ellipsis />
      </button>

      {isOpen && (
        <div className="absolute right-4 top-full w-15 border border-[var(--gray-200)]">
          <button
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
            className="block w-full text-left px-3 py-2 cursor-pointer hover:text-white"
          >
            수정
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="block w-full text-left px-3 py-2 cursor-pointer hover:text-white"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
