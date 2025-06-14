import React from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function Textarea({
  value,
  onChange,
  placeholder = '본문을 입력하세요.',
  width = '100%',
  height = '133px',
  className = '',
}: Props) {
  return (
    <textarea
      placeholder={placeholder}
      className={`border border-[var(--primary-300)] rounded-[8px] p-5 focus:outline-none resize-none ${className}`}
      style={{ width, height }}
      onChange={onChange}
      value={value}
    />
  );
}
