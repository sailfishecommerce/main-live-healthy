import type { PropsWithChildren } from 'react'

interface DropdownItemProps {
  onClick: (e?: any) => void
  className?: string
}

export default function DropdownItem({
  onClick,
  children,
  className,
}: PropsWithChildren<DropdownItemProps>) {
  return (
    <li>
      <button
        type="button"
        aria-label="dropdown"
        className={`
              ${className}
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
            `}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}
