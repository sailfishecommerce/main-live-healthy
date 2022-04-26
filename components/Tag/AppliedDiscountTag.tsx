import { FaTimes } from 'react-icons/fa'

interface Props {
  discountTitle: string
  count: number
}

export default function AppliedDiscountTag({ discountTitle, count }: Props) {
  const tagCount = Number(count) + 1
  return (
    <div className="flex md:px-2 p-1 items-center rounded-full border justify-between m-1 bg-gray-100">
      <span className="count bg-black rounded-full text-white md:h-6 md:w-6 w-4 h-4 flex text-xs items-center font-bold justify-center">
        {tagCount}
      </span>
      <p className="mb-0 text-xs mx-2">{discountTitle}</p>
      <button type="button" className="text-gray-400">
        <FaTimes />
      </button>
    </div>
  )
}
