import { ReactNode } from "react";
import { FadeInOutText } from "./fadeinout";

export function MainTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl font-bold text-white">{children}</h1>;
}

export const FeedSecondaryTitle = () => {
  return (
    <span className="text-white flex gap-1 text-2xl">
      Have you
      <FadeInOutText
        className="font-bold"
        texts={["played", "watched", "listened", "read", "enjoyed"]}
      />{" "}
      something today?
    </span>
  );
};
