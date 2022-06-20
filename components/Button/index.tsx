/* eslint-disable react/button-has-type */
interface Props {
  className: string
  text: string
  onClick?: () => void
  type: any | 'button' | 'reset' | 'submit'
  icon?: any
}

export default function Button({
  className,
  icon,
  text,
  onClick,
  type,
}: Props) {
  return (
    <>
      <button
        aria-label="button"
        type={type}
        className={className}
        onClick={onClick}
      >
        {icon} <span className="ml-2">{text}</span>
      </button>
      <style jsx>
        {`
          .light-green {
            background-color: var(--color-1);
            color: white;
            padding: 10px;
            border-radius: 10px;
          }
          .light-green:hover {
            background-color: var(--color-2);
          }
          .plain {
            border: 1px solid black;
            padding: 10px;
            border-radius: 10px;
          }
          .plain:hover {
            background-color: var(--color-1);
            color: white;
            border: none;
          }
        `}
      </style>
    </>
  )
}
