import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function Modal({
  icon,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onCancel,
  onConfirm,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--bg-color-80)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`rounded-[20px] border border-[rgba(144,144,144,0.47)] bg-[color:var(--bg-color)] text-center text-[#FBFBFB] w-[360px] ${
          description ? 'h-[239px]' : 'h-[199px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mt-8">{icon}</div>
        <h2 className="text-lg font-medium mt-4 font-[pretendard]">{title}</h2>
        {description && (
          <p className="text-sm text-[#8B8B8B] mt-4 font-[pretendard]">
            {description}
          </p>
        )}

        <div className="mt-7 flex justify-center gap-[27px]">
          {cancelButtonText && onCancel && (
            <button
              className="w-[92px] h-[33px] text-sm text-[color:var(--gray-200)] font-[yapari] cursor-pointer"
              onClick={onCancel}
            >
              {cancelButtonText}
            </button>
          )}
          {onConfirm && (
            <button
              className="w-[100px] h-[30px] rounded-lg text-xs font-bold text-[color:var(--bg-color)] bg-[color:var(--primary-300)] font-[yapari] cursor-pointer"
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
