"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
export const GoBack = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <button onClick={goBack} className="flex items-center gap-3 text-xl">
      <FaArrowLeft /> Voltar
    </button>
  );
};
