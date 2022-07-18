import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import classNames from 'classnames'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import dynamic from 'next/dynamic'

import { refinementsPanelMobileExpandedAtom } from '@/components/RefinementsPanel/refinements-panel'
import { ToggleFilters } from '@/components/ToggleFilters'
import { ViewModes } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import {
  CurrentRefinements,
  refinementCountAtom,
} from '@instantsearch/widgets/current-refinements/current-refinements'
import { RelevantSort } from '@instantsearch/widgets/relevant-sort/relevant-sort'
import { SortBy } from '@instantsearch/widgets/sort-by/sort-by'
import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'
import { Button } from '@ui/button/button'
import { Count } from '@ui/count/count'
import { IconLabel } from '@ui/icon-label/icon-label'

const RefinementsBarDropdowns = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'refinements-bar' */ '@/components/RefinementsBar/refinements-bar-dropdowns'
  ).then((mod) => mod.RefinementsBarDropdowns)
)

export type RefinementsBarProps = {
  dynamicWidgets?: boolean
  showRefinements?: boolean
  className?: string
}

function RefinementsBarComponent({
  dynamicWidgets = true,
  showRefinements = false,
  className,
}: RefinementsBarProps) {
  const { sorts } = useAtomValue(configAtom)

  const sortDefaultRefinement = sorts.find((s) => s.isDefault)?.value

  const setMobileExpanded = useUpdateAtom(refinementsPanelMobileExpandedAtom)
  const refinementCount = useAtomValue(refinementCountAtom)
  const searchResults = useAtomValue(searchResultsAtom)
  return (
    <section
      className={classNames(
        `w-full lg:relative bg-white z-40 pr-3 lg:pr-0`,
        { hidden: searchResults?.nbHits === 0 },
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex md:hidden justify-between">
          <ViewModes />

          <Button
            className="flex items-center gap-1"
            onClick={() => setMobileExpanded(true)}
          >
            <IconLabel
              icon={FilterIcon}
              label="Filter &amp; Sort"
              labelPosition="right"
              classNameLabel="body-regular"
            />
            {refinementCount > 0 && <Count>{refinementCount}</Count>}
          </Button>
        </div>

        <RelevantSort />
      </div>

      <div className="lg:flex flex-col hidden items-start gap-4">
        <div className="w-full flex gap-6">
          {showRefinements && (
            <RefinementsBarDropdowns dynamicWidgets={dynamicWidgets} />
          )}

          {!showRefinements && <CurrentRefinements />}

          <div className="flex gap-6 ml-auto flex-shrink-0 items-center">
            {!showRefinements && <ToggleFilters />}
            <ViewModes />
            <SortBy
              defaultRefinement={sortDefaultRefinement}
              items={sorts}
              className="w-52"
            />
          </div>
        </div>

        {showRefinements && <CurrentRefinements />}

        <RelevantSort />
      </div>
    </section>
  )
}

const RefinementsBar = withDebugLayer(RefinementsBarComponent, 'RefinementsBar')

export default RefinementsBar
