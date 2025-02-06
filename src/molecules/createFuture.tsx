"use client";
import { PrimaryButton } from "@/atoms/buttons";
import { useState } from "react";
import { TextInputAndLabel } from "./inputandlabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { futureMedia } from "../../schemas/future";

export const CreateFuture = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(futureMedia),
  });

  const onSubmit = () => {};

  return (
    <div>
      <PrimaryButton onClick={handleOpen}>
        Add to a In Future list
      </PrimaryButton>
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center w-screen h-screen bg-black/50">
          <div className="bg-light-bg w-[20rem] h-[20rem]">
            <p>Digite o nome do que você quer adicionar para o futuro</p>

            <TextInputAndLabel field="name" register={register} />
          </div>
        </div>
      )}
    </div>
  );
};
