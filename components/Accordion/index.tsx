import { PropsWithChildren, useState } from 'react'

interface Props {
  title: string
  stage: number
  icon?: JSX.Element
  isOpen?: boolean
}

export default function Accordion({
  title,
  stage,
  children,
  icon,
  isOpen,
}: PropsWithChildren<Props>) {
  const initialAccordionState = isOpen ? isOpen : false
  const [showContent, setShowContent] = useState(initialAccordionState)

  function onClickHandler() {
    setShowContent(!showContent)
  }
  return (
    <div className="accordion mb-2" id="accordionExample">
      <div className="accordion-item bg-white border border-gray-200">
        <h2
          className="accordion-header mb-0"
          onClick={onClickHandler}
          id="headingOne"
        >
          <button
            className="
        accordion-button
        hover:text-red-500        
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-gray-200
        border
        border-gray-400
        rounded-none
        transition
        focus:outline-none
      "
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
            <div className="accordion-body py-4 px-2 tablet:px-5">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
