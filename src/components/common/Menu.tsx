import { useEffect, useRef, useState } from 'react';

type MenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

export default function Menu({ onEdit, onDelete, className = '' }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-2xl font-bold px-1 py-1"
        aria-label="메뉴 열기"
      >
        ...
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-24 z-10">
          <button
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
            className="block w-full text-left px-4 py-2 cursor-pointer hover:text-white"
          >
            수정
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="block w-full text-left px-4 py-2 cursor-pointer hover:text-white"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
