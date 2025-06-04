import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "white_outline" | "neon_outline" | "neon_filled" | "disabled";
};

export default function Button({
  children,
  className,
  variant = "neon_outline",
  ...rest
}: ButtonProps) {
  const baseStyle =
    "flex justify-center items-center h-[30px] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300";
  let variantStyle = "";
  if (variant === "white_outline") {
    variantStyle =
      "border border-white text-white hover:bg-white hover:text-black";
  } else if (variant === "neon_outline") {
    variantStyle =
      "border border-[#D0F700] text-[#D0F700] hover:bg-[#D0F700] hover:text-black";
  } else if (variant === "neon_filled") {
    variantStyle = "bg-[#D0F700] text-black hover:opacity-90";
  } else if (variant === "disabled") {
    variantStyle =
      "border border-[#909090] text-[#909090] cursor-not-allowed opacity-50 pointer-events-none";
  }

  return (
    <button {...rest} className={twMerge(baseStyle, variantStyle, className)}>
      {children}
    </button>
  );
}
