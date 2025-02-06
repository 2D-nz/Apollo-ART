import { PrimaryButton, SecondaryButton } from "@/atoms/buttons";
import { FadeInOutText } from "@/atoms/fadeinout";
import { FeedSecondaryTitle, MainTitle } from "@/atoms/text";
import { CreateFuture } from "@/molecules/createFuture";
import { createClient } from "../../../../utils/supabase/server";
import { getUserWithData } from "@/supabase_functions/user";
import { getAllReviewsAndGroups } from "@/supabase_functions/reviews";
import { ProfileCard } from "@/molecules/profile-card";
import { ReviewsAndGroups } from "@/molecules/reviewsAndGroups";
import { BiPlus } from "react-icons/bi";
import { IncompleteProfilePage } from "./incomplete_profile_page";
import Link from "next/link";

export const MyPage = async () => {
  const supabase = await createClient();
  const user = await getUserWithData(supabase);
  const reviewsAndGroups = await getAllReviewsAndGroups(supabase, user.user_id);

  if (user.profile_complete) {
    return (
      <div className="pt-12 flex justify-center text-light-text">
        <div className="  ">
          <ProfileCard user={user} />
          <MainTitle>Hello, {user.name}</MainTitle>
          <div className="min-w-[26rem]">
            <FeedSecondaryTitle />
          </div>
          <div className="outline outline-1 w-[35rem] px-5 pb-5 rounded-md mt-5">
            <div className="flex items-center justify-between gap-5 my-5">
              <p className="text-2xl">Reviews</p>
              <Link href="/post">
                <PrimaryButton className="items-center flex justify-center ">
                  <BiPlus size={25} />
                </PrimaryButton>
              </Link>
            </div>

            <ReviewsAndGroups reviewsAndGroups={reviewsAndGroups} />
          </div>
        </div>
      </div>
    );
  } else {
    return <IncompleteProfilePage user={user} />;
  }
};
