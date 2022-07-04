import { FaTimes } from 'react-icons/fa'

interface Props {
  coupon: {
    name: string
    description: string
  }
}

export default function AppliedDiscountTag({ coupon }: Props) {
  return (
    <div className="flex md:px-2 p-1 items-center rounded-full border justify-between m-1 bg-gray-100">
      <span className="count bg-black rounded-full text-white md:h-6 md:w-6 w-4 h-4 flex text-xs items-center font-bold justify-center">
        $
      </span>
      {/* <p className="mb-0 text-xs mx-2">{coupon.name}</p> */}
      <p className="mb-0 text-xs mx-2">{coupon.description}</p>
      <button aria-label="button" type="button" className="text-gray-400">
        <FaTimes />
      </button>
    </div>
  )
}
