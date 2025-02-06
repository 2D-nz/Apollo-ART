import { Media } from "@/atoms/media";

export const ReviewsAndGroups = ({
  reviewsAndGroups,
}: {
  reviewsAndGroups: any[];
}) => {
  return (
    <div className="space-y-5 ">
      {reviewsAndGroups.map((item: any) => {
        return <Media item={item} />;
      })}
    </div>
  );
};
