import { PropsWithChildren } from "react";

interface DropdownItem {
  onClick: (e?: any) => void;
  className?: string;
}

export default function DropdownItem({
  onClick,
  children,
  className,
}: PropsWithChildren<DropdownItem>) {
  return (
    <li>
      <a
        aria-label="dropdown"
        onClick={onClick}
        className={`
              ${className}
              dropdown-item
              text-sm
              py-1
              px-2
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            `}
        href="#"
      >
        {children}
      </a>
    </li>
  );
}
