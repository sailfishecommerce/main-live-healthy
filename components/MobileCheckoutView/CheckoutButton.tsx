import type { PropsWithChildren } from 'react'

interface Props {
  className: string
  onClick: any
}

export default function CheckoutButton({
  className,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      type="button"
      aria-label="button"
      className={`${className} flex items-center justify-center text-lg  w-full py-2 rounded-lg my-6`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
