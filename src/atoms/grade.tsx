import { convertToStars, Stars } from "./grade-stars";

export const Grade = ({ grade, type }: { grade: number; type: string }) => {
  switch (type) {
    case "stars":
      return <Stars qtd={convertToStars(grade)} />;
      break;
  }
};
