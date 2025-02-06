"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const FadeInOutImage = ({
  elements,
  height,
  width,
  alt,
}: {
  elements: any[];
  height?: number;
  width?: number;
  alt?: string;
}) => {
  return (
    <AnimatePresence>
      {elements.map((element, key) => (
        <motion.div key={key} exit={{ opacity: 1 }} layout>
          <Image
            src={element}
            height={height ? height : 200}
            width={width ? width : 200}
            alt={alt ? alt : "image"}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export const FadeInOutText = ({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      changeIndex(texts.length, index);
    }, 2500);
  }, [index]);

  const changeIndex = (length: number, index: number) => {
    if (index + 1 == length) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ ease: "easeInOut" }}
        key={index}
        className={cn(className)}
      >
        {texts[index]}
      </motion.p>
    </AnimatePresence>
  );
};
