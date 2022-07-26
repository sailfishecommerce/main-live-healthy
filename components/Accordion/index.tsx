/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

interface Props {
  title: string
  stage: number
  icon?: JSX.Element
  isOpen?: boolean
  isGray?: boolean
  onClick?: () => void
}

export default function Accordion({
  title,
  stage,
  children,
  icon,
  isOpen,
  isGray,
  onClick,
}: PropsWithChildren<Props>) {
  const initialAccordionState = isOpen ? isOpen : false
  const [showContent, setShowContent] = useState(initialAccordionState)

  const colorMode = isGray ? 'bg-gray-200' : 'bg-white rounded-md'

  function onClickHandler() {
    if (onClick) onClick()
    setShowContent(!showContent)
  }
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item bg-white my-1">
        <h2
          className="accordion-header mb-0"
          id="headingOne"
          onClick={onClickHandler}
        >
          <button
            className={`
        accordion-button
        hover:text-red-500        
        relative
        flex
        items-center
        w-full
        lg:py-4
        py-2
        px-5
        text-base text-gray-800 text-left
        ${colorMode}
        border
        border-gray-300
        rounded-xl
        transition
        focus:outline-none
      `}
            type="button"
            data-bs-toggle="collapse"
            aria-label={title}
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {icon && <span className="icon">{icon}</span>}
            <span className="bg-red-500 mx-2 justify-center border-2 border-red-500 rounded-full text-white hover:bg-transparent hover:text-red-500 h-6 w-6 flex items-center">
              {stage}
            </span>
            {title}
          </button>
        </h2>
        {showContent && (
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body py-4 px-2 md:px-5">{children}</div>
          </div>
        )}
      </div>
    </div>
  )
}
