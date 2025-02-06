"use client";
import { PrimaryButton, SecondaryButton } from "@/atoms/buttons";
import { cn } from "@/lib/utils";
import { addPfpAndBio, updateBio } from "@/supabase_functions/user";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { createClient } from "../../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { IconCarrousel } from "@/components/iconCarousel";
import { ImageInput } from "@/molecules/input_image";

export const IncompleteProfilePage = ({ user }) => {
  const router = useRouter();
  const [image, setImage] = useState<string | File>("");
  const [bio, setBio] = useState("");
  const [step, setStep] = useState<"images" | "bio" | "finishing">("images");
  const nextStep = () => {
    setStep("bio");
    if (step == "bio") {
      setStep("finishing");
      return;
    }
  };

  const previousStep = () => {
    setStep("images");
  };

  const selectImage = (image) => {
    setImage(image);
    console.log("current image:  ", image);
  };

  const handleBio = (bio: string) => {
    setBio(bio);
    console.log("current bio: ", bio);
  };

  const finishProfile = async () => {
    const supabase = await createClient();

    await addPfpAndBio(supabase, image, bio, user);
    router.refresh();
  };

  return (
    <div className="inset-0 absolute flex items-center justify-center bg-black/50 w-screen h-screen">
      <div className="bg-light-bg w-[22rem]  h-[25rem] rounded-xl px-7 py-4 ">
        <div className="my-5">
          <div className="w-full h-5 outline-black outline-2 outline border rounded-lg flex  items-center">
            <div
              className={cn(
                step == "images" && "w-0",
                step == "bio" && "w-1/2",
                step == "finishing" && "w-full",

                "bg-green-500 h-5 rounded-lg"
              )}
            ></div>
          </div>
        </div>
        {step == "images" && (
          <div className="text-center">
            <p>Almost everything ready!</p>
            <p>but first, add a profile picture!</p>

            <ImageStep
              nextStep={nextStep}
              image={image}
              selectImage={selectImage}
            />
          </div>
        )}

        {step == "bio" && (
          <BioStep
            handleBio={handleBio}
            previousStep={previousStep}
            nextStep={nextStep}
          />
        )}

        {step == "finishing" && <FinishingStep finishProfile={finishProfile} />}
      </div>
    </div>
  );
};

export const ImageStep = ({
  selectImage,
  image,
  nextStep,
}: {
  selectImage: (image) => void;
  nextStep: () => void;
  image: string | undefined | File;
}) => {
  const images = Array(4).fill(0);
  useEffect(() => {
    selectImage("");
  }, []);
  const [selected, setSelected] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<string | undefined>();

  const handleSelection = (e) => {
    if (typeof e.target.value == typeof File) {
      console.log("file");
    }
    if (selected == e.target.id) {
      selectImage("");
      setSelected("");
      return;
    }
    setSelected(e.target.id);
    selectImage(e.target.id);
  };

  const handleFileSelection = (e) => {
    const fd = new FormData(document.getElementById("image_form"));
    console.log(fd);
    selectImage(fd.get("image_file"));
    setSelected("");
    setSelectedFile(URL.createObjectURL(fd.get("image_file")));
  };

  return (
    <div className="grid grid-cols-3 gap-y-10 mt-5">
      {images.map((image, index) => {
        return (
          <img
            onClick={(e) => {
              handleSelection(e);
            }}
            key={index}
            src={`Icon_${index + 1}.svg`}
            id={`Icon_${index + 1}.svg`}
            width={80}
            className={cn(
              "aspect-square hover:scale-110 cursor-pointer focus:scale-105 ease-in-out duration-100 ",
              selected == `Icon_${index + 1}.svg`
                ? "outline shadow-lg scale-110"
                : "outline-none"
            )}
          />
        );
      })}

      <ImageInput
        handleFileSelection={handleFileSelection}
        image={image}
        selectedFile={selectedFile}
      />
      <button
        className=" bg-primary text-light-text rounded-lg w-[80px] aspect-square flex items-center justify-center hover:scale-110 cursor-pointer focus:scale-110 ease-in-out duration-200 disabled:bg-gray-700  transition-colors "
        disabled={image == "" || image == null}
        onClick={nextStep}
      >
        Confirm
      </button>
    </div>
  );
};

export const BioStep = ({
  handleBio,
  previousStep,
  nextStep,
}: {
  handleBio: (bio: string) => void;
  previousStep: () => void;
  nextStep: () => void;
}) => {
  const addBio = () => {
    const textarea = document.getElementById("bio_form") as HTMLFormElement;
    if (textarea != null) {
      const fd = new FormData(textarea);
      const bio = fd.get("bio_field") as string;
      handleBio(bio);
      nextStep();
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-5">
      {" "}
      <p>Write a bio so everyone can see what your profile is about!</p>
      <div>
        <form id="bio_form">
          <textarea
            name="bio_field"
            id=""
            className="w-[20rem] h-[12rem]  outline outline-1 rounded-lg shadow-2xl drop-shadow-sm resize-none p-2"
          ></textarea>
        </form>
        <SecondaryButton onClick={previousStep}> Back </SecondaryButton>
        <PrimaryButton onClick={addBio} className="float-right">
          {" "}
          Save bio and Finish Profile
        </PrimaryButton>
      </div>
    </div>
  );
};

export const FinishingStep = ({
  finishProfile,
}: {
  finishProfile: () => void;
}) => {
  finishProfile();
  return (
    <div>
      <h1> Wait just a little bit while we're finishing your profile!</h1>
      <IconCarrousel />
    </div>
  );
};
