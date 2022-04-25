import { memo, PropsWithChildren, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  dropdownText: string | JSX.Element;
  className?: string;
}

function DropdownComponent({
  dropdownText,
  children,
  className,
}: PropsWithChildren<Props>) {
  const [active, setActive] = useState(false);
  const dropdownClassName = className
    ? className
    : " bg-red-500 hover:bg-red-700 hover:shadow-lg border-red-900 focus:bg-red-700 active:bg-red-800 uppercase";

  return (
    <div className="flex">
      <div className="dropdown relative">
        <button
          onMouseEnter={() => setActive(!active)}
          className={`${dropdownClassName} px-2 ml-2 lg:px-4
          py-2          
          text-white
          font-medium
          text-xs
          leading-tight
          rounded
          shadow-md
          border
          focus:shadow-lg focus:outline-none focus:ring-0
           active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          z-50
          items-center
          whitespace-nowrap
        `}
          type="button"
          id="dropdownMenuButton1"
          aria-expanded="false"
          aria-label={`${dropdownText}`}
        >
          {dropdownText}
          <AiFillCaretDown className="ml-2" />
        </button>
        {active && (
          <ul
            className="
          min-w-max
          absolute
          bg-white
          text-base
          z-40
          float-left
          py-2
          list-none
          top-10
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
            aria-labelledby="dropdownMenuButton1"
          >
            {children}
          </ul>
        )}
      </div>
    </div>
  );
}

const Dropdown = memo(DropdownComponent);
export default Dropdown;
