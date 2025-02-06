"use client";
import { TextInputAndLabel } from "./inputandlabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { PrimaryButton } from "@/atoms/buttons";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { createGroupReviewSchema } from "@/types/medias";
import { ImageInput } from "./input_image";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";

export const CreateGroupFirstStep = ({
  setFormInfo,
  setStep,
}: {
  setFormInfo: ({}) => void;
  setStep: (value: "first" | "last") => void;
}) => {
  const inputRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(createGroupReviewSchema),
  });

  const onSubmit = async (fd) => {
    setFormInfo(fd);
    setStep("last");
  };

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInputAndLabel register={register} field="Name" />
        {errors.name && (
          <p className="text-red-500">{errors.name.message?.toString()}</p>
        )}
        <div className="grid my-2">
          <label htmlFor="Description"> Description of the group</label>
          <textarea
            ref={inputRef}
            name=""
            className="w-[20rem] h-[12rem]  outline outline-1 rounded-lg shadow-2xl drop-shadow-sm resize-none p-2"
          />
          {errors.description && (
            <p className="text-red-500">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>
        <PrimaryButton className="float-right"> Next </PrimaryButton>
      </motion.form>
    </AnimatePresence>
  );
};

export const CreateGroupLastStep = () => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(createGroupReviewSchema),
  });

  const onSubmit = () => {
    console.log("oi");
  };

  const handleFileSelection = () => {
    const fd = new FormData(document.getElementById("image_form"));

    setSelectedFile(URL.createObjectURL(fd.get("image_file")));
  };

  return (
    <AnimatePresence>
      <motion.form
        onSubmitCapture={handleSubmit(onSubmit)}
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Add a picture!</h1>

        <label>
          <span>
            {selectedFile ? (
              <label>
                <input
                  name="image_file"
                  type="file"
                  onChange={handleFileSelection}
                  accept="image/*"
                  className="hidden"
                  required
                />
                <img
                  src={selectedFile}
                  className={cn(
                    "aspect-square  outline outline-1 cursor-pointer w-[15rem] hover:scale-105 object-cover  ease-in-out duration-100 "
                  )}
                />
              </label>
            ) : (
              <div className=" outline-dotted w-[80px] aspect-square flex items-center justify-center hover:scale-110 cursor-pointer focus:scale-110 ease-in-out duration-100  gap-2">
                <FaPlus size={10} /> <p className="text-xs">Select</p>
              </div>
            )}
          </span>
          <input
            name="image_file"
            type="file"
            onChange={handleFileSelection}
            accept="image/*"
            className="hidden"
          />
        </label>
        <PrimaryButton className="float-right"> Next </PrimaryButton>
      </motion.form>
    </AnimatePresence>
  );
};
