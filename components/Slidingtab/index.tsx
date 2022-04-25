import { FaTimes } from "react-icons/fa";
import { PropsWithChildren } from "react";

import useSlidingTab from "@/hooks/useSlidingTab";

interface Props {
  buttonColor?: string;
}

export default function SlidingTab({
  children,
  buttonColor,
}: PropsWithChildren<Props>) {
  const { updateSlideTab } = useSlidingTab();
  const defaultButtonColor = buttonColor ? buttonColor : "text-black";

  return (
    <aside className="fixed flex z-50 justify-between h-screen items-center w-full right-0 top-0">
      <div
        onClick={() => updateSlideTab(null)}
        className="overlay lg:w-2/3 w-1/12 flex cursor-pointer h-full"
      ></div>
      <div className="fixed top-0 items-start bg-white z-50 flex flex-col sliding-tab w-11/12 lg:w-1/3 h-full">
        <button
          onClick={() => updateSlideTab(null)}
          className={`${defaultButtonColor} closeButton absolute p-1 top-5 right-10 hover:text-white hover:rounded-full`}
        >
          <FaTimes size={20} />
        </button>
        {children}
      </div>
      <style jsx>
        {`
          .overlay {
            background-color: rgba(0, 0, 0, 0.4);
            height: 100vh;
            left: 0;
            top: 0%;
          }
          .sliding-tab {
            right: 0;
          }
          .text-content {
            overflow-y: auto;
            height: 80vh;
          }
          button.closeButton:hover {
            background-color: var(--mountain-mist);
          }
        `}
      </style>
    </aside>
  );
}
