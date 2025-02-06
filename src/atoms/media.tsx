import { dateToBRStringDate } from "@/lib/date-utils";
import Link from "next/link";
import { FaFolder, FaStar } from "react-icons/fa";

export const Media = ({ item, card }: { item: any; card?: boolean }) => {
  return (
    <div className="flex items-center gap-3 px-5 py-2 rounded-md text-dark-text bg-light-bg">
      {item.group ? <FaFolder /> : <FaStar />}
      <Link href={item.group ? `/g/${item.id}` : `/r/${item.id}`}>
        {" "}
        {item.name}, {item.created_at && dateToBRStringDate(item.created_at)}
      </Link>
    </div>
  );
};
