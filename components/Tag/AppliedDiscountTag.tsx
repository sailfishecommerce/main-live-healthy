import { FaTimes } from "react-icons/fa";

interface Props {
  discountTitle: string;
  count: number;
}

export default function AppliedDiscountTag({ discountTitle, count }: Props) {
  const tagCount = Number(count) + 1;
  return (
    <div className="flex px-2 py-1 items-center rounded-full border justify-between m-1 bg-gray-100">
      <span className="count bg-black rounded-full text-white h-6 w-6 flex text-xs items-center font-bold justify-center">
        {tagCount}
      </span>
      <p className="mb-0 text-xs mx-2">{discountTitle}</p>
      <button className="text-gray-400">
        <FaTimes />
      </button>
    </div>
  );
}
