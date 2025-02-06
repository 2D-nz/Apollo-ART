import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const convertToStars = (grade: number) => {
  function round(value: number) {
    var inv = 1.0 / 0.5;
    console.log(value);
    return Math.round(value * inv) / inv;
  }
  const stars = round(grade / 20);
  return stars;
};

export const Stars = ({ qtd }: { qtd: number }) => {
  let stars = [];
  let fullStars = Number(qtd.toString()[0]);
  let halfStars = qtd.toString()[2];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar />);
  }
  if (halfStars) {
    for (let i = 0; i < halfStars.length; i++) {
      stars.push(<FaStarHalfAlt />);
    }
  }

  return <div className="flex">{stars}</div>;
};
