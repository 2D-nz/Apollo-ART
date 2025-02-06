import { MainTitle } from "@/atoms/text";
import { FaFolder, FaStar } from "react-icons/fa";

import { PrimaryButton } from "@/atoms/buttons";
import { FadeInOutText } from "@/atoms/fadeinout";
import { CreateFuture } from "@/molecules/createFuture";
import { createClient } from "../../../../utils/supabase/server";
import { checkAuthSession, getUserWithData } from "@/supabase_functions/user";
import {
  getAllReviewsAndGroups,
  getAllReviewsNames,
  getGroups,
} from "@/supabase_functions/reviews";
import { ReviewsAndGroups } from "@/molecules/reviewsAndGroups";
import { MyPage } from "./my_page";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const supabase = await createClient();
  const isSameUser = await checkAuthSession(supabase, username);
  return (
    <div>
      {isSameUser ? (
        <MyPage />
      ) : (
        <div className="text-white">
          <p>Este usuário não foi encontrado </p>
        </div>
      )}
    </div>
  );
}
