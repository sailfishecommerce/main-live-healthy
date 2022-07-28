import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import InfiniteHits from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import ToggleMobileFilter from '@/components/RefinementsBar/ToggleMobileFilter'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import { useMediaQuery } from '@/hooks'
import { useIsMounted } from '@/hooks/useIsMounted'

const Breadcrumb = dynamic(
  () =>
    import(
      /* webpackChunkName: 'Breadcrumb' */ '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
    ),
  { ssr: false }
)

const RefinementsBar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RefinementsBar' */ '@/components/RefinementsBar/refinements-bar'
    ),
  {
    ssr: false,
  }
)

const RefinementsPanel = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RefinementsPanel' */ '@/components/RefinementsPanel/refinements-panel'
    ),
  {
    ssr: false,
  }
)

export default function Index() {
  const isMounted = useIsMounted()
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)
  const laptop = useMediaQuery('(min-width:1200px)') && isMounted()
  const mobileDevice = useMediaQuery('(max-width:768px)')

  return (
    <div className="flex flex-col px-2 lg:px-0 gap-2 collection-view container lg:mx-auto lg:mb-10 lg:mt-0 lg:gap-0">
      <Breadcrumb attributes={breadcrumbAttributes} className="mt-2" />
      <div className="flex flex-col lg:flex-row">
        {(refinementsLayout === 'panel' || !laptop) && <RefinementsPanel />}

        <div className="grow relative flex flex-col gap-2 lg:gap-5 w-full">
          <RefinementsBar
            showRefinements={refinementsLayout === 'bar' && laptop}
          />

          <NoResultsHandler>
            {mobileDevice && <ToggleMobileFilter />}
            {/* <ToggleMobileFilter /> */}
            <InfiniteHits viewMode={viewMode} showLess={true} showMore={true} />
          </NoResultsHandler>
        </div>
      </div>
    </div>
  )
}
