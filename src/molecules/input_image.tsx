import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";

export const ImageInput = ({
  selectedFile,
  image,
  handleFileSelection,
}: {
  image: File | string | undefined;
  selectedFile: string | undefined;
  handleFileSelection: (e: any) => void;
}) => {
  return (
    <form name="image_form" id="image_form">
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
              />
              <img
                src={selectedFile}
                className={cn(
                  "aspect-square hover:scale-110 cursor-pointer w-[80px] focus:scale-105 ease-in-out duration-100",
                  typeof image == "string"
                    ? "outline-1 outline"
                    : "outline outline-3 shadow-2xl drop-shadow-xl scale-110"
                )}
              />
            </label>
          ) : (
            <div className=" outline-dotted w-[80px] aspect-square flex items-center justify-center hover:scale-110 cursor-pointer focus:scale-110 ease-in-out duration-100   gap-2">
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
    </form>
  );
};
