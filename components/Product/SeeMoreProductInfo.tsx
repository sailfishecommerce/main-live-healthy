interface Props {
  title: string
  onClick: () => void
}

export default function SeeMoreProductInfo({ title, onClick }: Props) {
  return (
    <div className="flex justify-start my-4">
      <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
      <button
        type="button"
        className="mountain-mist ml-2 -mt-4 lg:text-lg text-xs hover:px-2 hover:py-1 hover:flex hover:items-center font-medium hover:border-green-500 hover:text-white hover:bg-green-300 hover:rounded-full"
        onClick={onClick}
      >
        See more
      </button>
    </div>
  )
}
