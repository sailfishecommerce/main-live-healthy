/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { PropsWithChildren } from 'react'
import { FaTimes } from 'react-icons/fa'

import useSlidingTab from '@/hooks/useSlidingTab'
import type { slidingTabType } from '@/typings/atomtype'

interface Props {
  buttonColor?: string
}

export default function SlidingTab({
  children,
  buttonColor,
}: PropsWithChildren<Props>) {
  const defaultButtonColor = buttonColor ? buttonColor : 'text-black'
  const { updateSlideTab } = useSlidingTab()

  function updateSlidingTabHandler(value: slidingTabType) {
    return updateSlideTab(value)
  }

  return (
    <section className="fixed flex z-50 justify-between h-screen items-center w-full right-0 top-0">
      <div
        className="overlay lg:w-2/3 w-1/12 flex cursor-pointer h-full"
        onClick={() => updateSlidingTabHandler(null)}
      />
      <div className="fixed top-0 items-start bg-white z-50 flex flex-col sliding-tab w-11/12 lg:w-1/3 h-full">
        <button
          type="button"
          aria-label="button"
          className={`${defaultButtonColor} closeButton absolute p-1 top-5 right-10 hover:text-white hover:rounded-full`}
          onClick={() => updateSlidingTabHandler(null)}
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
          button.closeButton {
            height: 30px;
            width: 30px;
            border: 1px solid black;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
            background-color: white;
          }
          button.closeButton:hover {
            background-color: red;
            border: none;
          }
        `}
      </style>
    </section>
  )
}
