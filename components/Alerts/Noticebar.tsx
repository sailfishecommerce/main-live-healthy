import { memo } from 'react'

interface Props {
  toggleBarVisibility: () => void
}

function NoticebarComponent({ toggleBarVisibility }: Props) {
  return (
    <div className="noticebar bg-stone-black p-2 md:p-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="white text-xs md:text-sm w-5/6">
          ⚡️ Delivery from Australia to Hong Kong - EXPECT DELAYS DUE TO COVID
          10-20 days - SORRY!
        </p>
        <button
          type="button"
          aria-label="close"
          className="text-white hover:bg-white hover:text-black hover:rounded-full h-6 w-6 flex items-center font-bold justify-center"
          onClick={toggleBarVisibility}
        >
          X
        </button>
      </div>
    </div>
  )
}

const Noticebar = memo(NoticebarComponent)

export default Noticebar
