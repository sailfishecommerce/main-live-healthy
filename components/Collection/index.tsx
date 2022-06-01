import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import InfiniteHits from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import { useMediaQuery } from '@/hooks'
import { useIsMounted } from '@/hooks/useIsMounted'

const Breadcrumb = dynamic(
  () =>
    import(
      /* webpackChunkName: 'Breadcrumb' */ '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
    )
)

const RefinementsBar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RefinementsBar' */ '@/components/RefinementsBar/refinements-bar'
    )
)

const RefinementsPanel = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RefinementsPanel' */ '@/components/RefinementsPanel/refinements-panel'
    )
)

// const InfiniteHits = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'InfiniteHits' */ '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
//     ),
//   {
//     ssr: false,
//   }
// )

export default function Index() {
  const isMounted = useIsMounted()
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)
  const laptop = useMediaQuery('(min-width:1200px)') && isMounted()

  return (
    <div className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-0 lg:gap-0">
      <Breadcrumb attributes={breadcrumbAttributes} />
      <div className="flex flex-col lg:flex-row">
        {(refinementsLayout === 'panel' || !laptop) && <RefinementsPanel />}

        <div className="grow relative flex flex-col gap-2 lg:gap-5 w-full">
          <RefinementsBar
            showRefinements={refinementsLayout === 'bar' && laptop}
          />

          <NoResultsHandler>
            <InfiniteHits viewMode={viewMode} showLess={true} showMore={true} />
          </NoResultsHandler>
        </div>
      </div>
    </div>
  )
}
