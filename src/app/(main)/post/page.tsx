"use client";
import { PrimaryButton } from "@/atoms/buttons";
import { cn } from "@/lib/utils";
import {
  CreateGroupFirstStep,
  CreateGroupLastStep,
} from "@/molecules/create-group";
import { TextInputAndLabel } from "@/molecules/inputandlabel";
import { createGroupReviewSchema } from "@/types/medias";
import { useState } from "react";

export default function Page() {
  const [ReviewOrGroup, setReviewOrGroup] = useState<
    "review" | "group" | undefined
  >();

  const handleGroup = () => {
    setReviewOrGroup("group");
  };

  const handleReview = () => {
    setReviewOrGroup("review");
  };
  return (
    <div className="text-white mt-20">
      <div className="flex justify-center items-center">
        <div className={cn(ReviewOrGroup && "hidden", "space-y-5")}>
          <h2>Do you want to create Group or a Review?</h2>
          <div className="flex justify-around ">
            <PrimaryButton onClick={handleGroup}>Group</PrimaryButton>
            <PrimaryButton onClick={handleReview}>Review</PrimaryButton>
          </div>
        </div>
        {ReviewOrGroup == "review" && <CreateReview />}
        {ReviewOrGroup == "group" && <CreateGroup />}
      </div>
    </div>
  );
}

const CreateReview = () => {
  return (
    <div className="bg-light-bg w-[30rem] rounded-lg text-dark-text">
      <p className="text-center">Your review name</p>
      <TextInputAndLabel field="Name" register={register} />
    </div>
  );
};

const CreateGroup = () => {
  const [formInfo, setFormInfo] = useState({});
  const [step, setStep] = useState<"first" | "last">("first");

  return (
    <div>
      {step == "first" && (
        <CreateGroupFirstStep setFormInfo={setFormInfo} setStep={setStep} />
      )}
      {step == "last" && <CreateGroupLastStep />}
    </div>
  );
};
