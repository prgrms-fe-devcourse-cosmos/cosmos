import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?:
    | "white_outline"
    | "neon_outline"
    | "neon_filled"
    | "dark_line"
    | "back"
    | "disabled"
    | "hover_fill";
};

export default function Button({
  children,
  className,
  variant = "neon_outline",
  ...rest
}: ButtonProps) {
  const baseStyle =
    "flex justify-center items-center py-2 px-6 rounded-[8px] cursor-pointer transition-all duration-300 font-[yapari]";
  let variantStyle = "";
  if (variant === "white_outline") {
    variantStyle =
      "border border-white text-white hover:bg-white hover:text-black";
  } else if (variant === "neon_outline") {
    variantStyle =
      "border border-[color:var(--primary-300)] text-[color:var(--primary-300)] hover:bg-[color:var(--primary-300)] hover:text-black";
  } else if (variant === "neon_filled") {
    variantStyle = "bg-[color:var(--primary-300)] text-black hover:opacity-90 ";
  } else if (variant === "dark_line") {
    variantStyle =
      "border-[color:var(--gray-200)] text-[color:var(--gray-200)]";
  } else if (variant === "back") {
    variantStyle =
      "text-[color:var(--gray-200)] w-[85px] h-[49px] group-hover:text-[color:var(--primary-300)]";
  } else if (variant === "disabled") {
    variantStyle =
      "border border-[color:var(--gray-200)] text-[color:var(--gray-200)] cursor-not-allowed opacity-50 pointer-events-none";
  } else if (variant === "hover_fill") {
    variantStyle = `border  border-[color:var(--primary-300)] text-[color:var(--primary-300)]
    group-hover:bg-[color:var(--primary-300)] group-hover:text-black group-hover:font-medium`;
  }

  return (
    <button {...rest} className={twMerge(baseStyle, variantStyle, className)}>
      {children}
    </button>
  );
}
