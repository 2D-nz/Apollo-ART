import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { createClient } from "../../../../../utils/supabase/server";
import { getReview } from "@/supabase_functions/reviews";
import { Grade } from "@/atoms/grade";
import Image from "next/image";
import { GoBack } from "@/atoms/go-back-button";
export default async function Page({
  params,
}: {
  params: Promise<{ review: string }>;
}) {
  const supabase = await createClient();
  const id = (await params).review;
  const review = await getReview(supabase, id);

  console.log(review);

  const link = review.parent ? `/g/${review.parent.toString()}` : "/home";

  return (
    <div className="text-light-text">
      <GoBack />
      <div className="px-10">
        <div className="flex gap-5">
          <div className="w-[300px] h-[300px] relative">
            <Image
              src="/91dHRGIV65L._AC_UF1000,1000_QL80_.jpg"
              fill={true}
              alt="image"
            />
          </div>
          <div>
            <h1 className="gap-3 text-3xl font-bold ">
              {review.name} <Grade grade={50} type="stars" />
            </h1>
            <p className="text-2xl">{review.description}</p>
          </div>
        </div>
        <div className="mt-12">
          <p className="text-xl">{review.review}</p>
        </div>
      </div>
    </div>
  );
}
