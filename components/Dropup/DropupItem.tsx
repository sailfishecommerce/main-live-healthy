import { PropsWithChildren } from "react";

interface DropupItem {
  onClick: (e?: any) => void;
  className?: string;
}

export default function DropupItem({
  onClick,
  children,
}: PropsWithChildren<DropupItem>) {
  return (
    <li>
      <a
        aria-label="dropup"
        onClick={onClick}
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
      >
        {children}
      </a>
    </li>
  );
}
