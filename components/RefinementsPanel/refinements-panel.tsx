import classNames from 'classnames'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { overlayAtom } from '@/components/Overlay'
import { RefinementsPanelBody } from '@/components/RefinementsPanel/refinements-panel-body'
import { RefinementsPanelHeader } from '@/components/RefinementsPanel/refinements-panel-header'
import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
}

const mobileExpandedAtom = atom(false)
export const refinementsPanelMobileExpandedAtom = atom(
  (get) => get(mobileExpandedAtom) && get(overlayAtom)?.visible,
  (get, set, expanded: boolean) => {
    set(mobileExpandedAtom, expanded)
    set(overlayAtom, { visible: expanded, zIndex: 'z-overlay-full' })
  }
)
export const refinementsPanelDesktopExpandedAtom = atom(true)

export default function RefinementsPanel({
  dynamicWidgets = true,
}: RefinementsPanelProps) {
  const mobileExpanded = useAtomValue(refinementsPanelMobileExpandedAtom)
  const desktopExpanded = useAtomValue(refinementsPanelDesktopExpandedAtom)
  const searchResults = useAtomValue(searchResultsAtom)

  const cn = classNames('RefinementsPanel', {
    'RefinementsPanel-mobileExpanded': mobileExpanded,
    'RefinementsPanel-desktopExpanded': desktopExpanded,
    hidden: searchResults?.nbHits === 0,
  })

  return (
    <section className={cn}>
      <div className="w-full lg:w-64 lg:h-full lg:overflow-y-auto">
        <div className="h-full w-full flex flex-col lg:pr-5">
          <div className="grow px-4 overflow-y-auto lg:px-0 lg:overflow-y-visible">
            <RefinementsPanelHeader />
            <RefinementsPanelBody dynamicWidgets={dynamicWidgets} />
          </div>
        </div>
      </div>

      <div className="RefinementsPanel-gradient" />
    </section>
  )
}
