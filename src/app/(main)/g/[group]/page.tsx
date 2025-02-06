import { getDataFromGroup, getGroup } from "@/supabase_functions/reviews";
import { createClient } from "../../../../../utils/supabase/server";
import { Media } from "@/atoms/media";
import { dateToBRStringDate } from "@/lib/date-utils";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { GoBack } from "@/atoms/go-back-button";

export default async function Page({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const supabase = await createClient();
  const id = (await params).group;
  const data = await getDataFromGroup(supabase, id);
  const group = await getGroup(supabase, id);
  return (
    <div className="px-5 py-20 text-white">
      <GoBack />
      <div className="">
        <h2 className="text-4xl"> {group.name}</h2>
        <p>{dateToBRStringDate(group.created_at)}</p>
        <p>{group.description}</p>
        <div className="w-1/2">
          {data.map((item) => {
            return <Media item={item} />;
          })}
        </div>{" "}
      </div>
    </div>
  );
}
