import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type LabeledInputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isEmpty?: boolean;
};

export default function LabeledInput({
  label,
  errorMessage,
  isInvalid = false,
  isEmpty = true,
  className,
  ...rest
}: LabeledInputProps) {
  const baseInputClass =
    "transition-all focus:outline-none border border-[color:var(--gray-200)] rounded-md px-3 py-2 text-sm w-full ";

  const finalInputClass = twMerge(
    baseInputClass,
    isInvalid
      ? "border-[color:var(--red)] focus:border-[color:var(--red)]"
      : isEmpty
      ? "border-[color:var(--gray-200)] focus:border-[var(--primary-300)]"
      : "border-[var(--primary-300)] focus:border-[var(--primary-300)]",
    rest.disabled ? "text-[color:var(--gray-200)] cursor-not-allowed " : "",
    className
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm w-full text-left px-1">{label}</label>
      <input className={finalInputClass} {...rest} />
      {isInvalid && errorMessage && (
        <div className="text-sm text-[color:var(--red)] w-full text-left px-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
