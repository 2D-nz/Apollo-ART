import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

function buttonSize(size?: number) {
  return "size-";
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  outline?: boolean;
}

export function PrimaryButton({
  children,
  className,
  outline,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-primary px-5 py-2 mt-2 hover:brightness-125 transition-all ease-in text-light-text rounded-lg ",
        className,
        outline ? "bg-inherit outline-2 outline outline-primary" : ""
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  outline,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-secondary rounded-lg  text-dark-text px-5 py-2 mt-2 hover:brightness-125 transition-all ease-in ",
        className
      )}
    >
      {children}
    </button>
  );
}
