import { useEffect, useRef, useState } from 'react';
import Dropdown, { DropdownItem } from './Dropdown';
import { PencilLine, Trash2, Ellipsis } from 'lucide-react';

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

  const items: DropdownItem[] = [
    {
      icon: <PencilLine size={16} />,
      label: '게시물 수정',
      onClick: () => {
        setIsOpen(false);
        onEdit();
      },
    },
    {
      icon: <Trash2 size={16} />,
      label: '게시물 삭제',
      danger: true,
      onClick: () => {
        setIsOpen(false);
        onDelete();
      },
    },
  ];

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-bold px-1 py-1 cursor-pointer"
        aria-label="메뉴 열기"
      >
        <Ellipsis />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10">
          <Dropdown items={items} size="post"/>
        </div>
      )}
    </div>
  );
}