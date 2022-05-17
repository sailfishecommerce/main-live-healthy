/* eslint-disable jsx-a11y/anchor-is-valid */
import type { PropsWithChildren } from 'react'

interface DropupItemProps {
  onClick: (e?: any) => void
  className?: string
}

export default function DropupItem({
  onClick,
  children,
}: PropsWithChildren<DropupItemProps>) {
  return (
    <li>
      <a
        aria-label="dropup"
        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
        href="#"
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  )
}
