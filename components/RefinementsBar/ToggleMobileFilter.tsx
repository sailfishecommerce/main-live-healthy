import { useUpdateAtom } from 'jotai/utils'
import { BsFillFilterCircleFill } from 'react-icons/bs'

import { refinementsPanelMobileExpandedAtom } from '@/components/RefinementsPanel/refinements-panel'

export default function ToggleMobileFilter() {
  const setMobileExpanded = useUpdateAtom(refinementsPanelMobileExpandedAtom)

  function toggleFilterHandler() {
    setMobileExpanded(true)
  }

  return (
    <>
      <button
        type="button"
        className="toggleFilter"
        onClick={toggleFilterHandler}
      >
        <BsFillFilterCircleFill size={30} />
      </button>
      <style jsx>
        {`
          .toggleFilter {
            border-radius: 50%;
            height: 40px;
            width: 40px;
            position: fixed;
            right: 5px;
            top: 50%;
            z-index: 20;
            border: 1px solid gray;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}
