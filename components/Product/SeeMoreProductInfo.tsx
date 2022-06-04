interface Props {
  title: string
  onClick: () => void
}

export default function SeeMoreProductInfo({ title, onClick }: Props) {
  return (
    <div className="flex justify-start my-2 lg:my-4">
      <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
      <button
        aria-label="see more"
        type="button"
        className="mountain-mist ml-2 -mt-4 lg:text-lg text-xs hover:items-center hover:px-2 hover:py-1 hover:flex hover:text-center  hover:h-8 font-medium hover:border hover:rounded-full"
        onClick={onClick}
      >
        See more
      </button>
    </div>
  )
}
