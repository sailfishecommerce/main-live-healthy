interface Props {
  text: string
  id: string
  onClick: (index: number) => void
  tab: number
  index: number
}

export default function TabList({ text, id, onClick, index, tab }: Props) {
  const onClickHandler = () => onClick(index)

  const active =
    tab === index ? 'bg-mountain-green text-white' : 'bg-white mountain-green'
  return (
    <li
      className="nav-item flex-auto text-center"
      role="presentation"
      onClick={onClickHandler}
    >
      <a
        className={`
        ${active}
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-200
      focus:border-transparent
  `}
        id={`tabs-${id}`}
      >
        {text}
      </a>
    </li>
  )
}
