import { SecondaryButton } from "@/atoms/buttons";
import { getProfilePic } from "@/supabase_functions/images";
import { createClient } from "../../utils/supabase/server";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ProfileCard = async ({ user }) => {
  const supabase = await createClient();
  const profilePicResponse = await getProfilePic(supabase, user.picture);
  let image: string;
  if ("signedUrl" in profilePicResponse) {
    image = profilePicResponse.signedUrl;
  } else {
    image = "/Icon_1.svg";
  }

  return (
    <div className="flex gap-5">
      <div className={cn("w-[10rem] aspect-square")}>
        <img src={image} />
      </div>
      <div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-5  justify-between">
            <div className="flex gap-10">
              <div>
                <p>{user.name}</p>
                <p>{user.username}</p>
              </div>
              <SecondaryButton>Edit Profile</SecondaryButton>
            </div>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
