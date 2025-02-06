import React from "react";
import { IconName } from "boxicons";
import { cn } from "@/lib/utils";

interface IconProps {
  name: IconName;
  size?: string;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "24px",
  color = "",
  className,
}) => {
  return (
    <i
      className={cn(`bx ${name}`, className)}
      style={{ fontSize: size, color }}
    />
  );
};
