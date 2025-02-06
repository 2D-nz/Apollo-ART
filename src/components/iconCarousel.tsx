"use client";
import { Icon } from "@/components/icon";
import { ReactNode, useEffect } from "react";
import { useState } from "react";

export function IconCarrousel() {
  const [icon, setIcon] = useState(0);

  const iconsCarrousel = [
    <Icon name="bx-palette" size="40px" />,
    <Icon name="bx-camera-movie" size="40px" />,
    <Icon name="bx-music" size="40px" />,
    <Icon name="bx-joystick-alt" size="40px" />,
  ];

  const handleIconChange = () => {
    if (icon == iconsCarrousel.length - 1) {
      setIcon(0);
    } else {
      setIcon(icon + 1);
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      handleIconChange();
    }, 2000);
    return () => clearTimeout(interval);
  }, [icon]);

  return <div className="items-baseline">{iconsCarrousel[icon]}</div>;
}
