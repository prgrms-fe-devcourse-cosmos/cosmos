import React from "react";

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
  placeholder = "본문을 입력하세요.",
  width = "100%",
  className = "",
}: Props) {
  return (
    <textarea
      placeholder={placeholder}
      className={`h-[133px] border border-[var(--gray-200)] rounded-[8px] p-5 focus:outline-none focus:border-[var(--primary-300)] resize-none ${className}`}
      style={{ width }}
      onChange={onChange}
      value={value}
    />
  );
}
