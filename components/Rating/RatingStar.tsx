import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface RatingStarProps {
  rate: number;
}

export default function RatingStar({ rate }: RatingStarProps) {
  const givenRate = Number(rate);
  const validRate = givenRate ? givenRate : 5;
  const activeRate = new Array(validRate).fill(0);
  const inactiveRateCount = 5 - validRate;
  const validInactiveRate = inactiveRateCount ? inactiveRateCount : 0;
  const inactiveRate = new Array(validInactiveRate).fill(0);

  return (
    <div className="star-rating flex items-center">
      {activeRate.map((_, index) => (
        <AiFillStar fill="orange" className="mr-1" key={index} />
      ))}
      {inactiveRate.map((_, index) => (
        <AiOutlineStar className="mr-1" key={index} />
      ))}
    </div>
  );
}
