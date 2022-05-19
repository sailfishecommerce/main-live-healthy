import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import { viewModeAtom } from '@/components/ViewModes'
// import { configAtom } from '@/config/config'
// import { useMediaQuery } from '@/hooks'

// const Breadcrumb = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'Breadcrumb' */ '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
//     ),
//   {
//     ssr: false,
//   }
// )

// const RefinementsBar = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'RefinementsBar' */ '@/components/RefinementsBar/refinements-bar'
//     ),
//   {
//     ssr: false,
//   }
// )

// const RefinementsPanel = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'RefinementsPanel' */ '@/components/RefinementsPanel/refinements-panel'
//     ),
//   {
//     ssr: false,
//   }
// )

const InfiniteHits = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InfiniteHits' */ '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
    ),
  {
    ssr: false,
  }
)

export default function Index() {
  // const { breadcrumbAttributes, refinementsLayoutAtom } =
  //   useAtomValue(configAtom)
  // const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)

  // const laptop = useMediaQuery('(min-width:1200px)')
  return (
    <div className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-0 lg:gap-0">
      {/* <Breadcrumb attributes={breadcrumbAttributes} /> */}
      <div className="flex flex-col lg:flex-row">
        {/* {(refinementsLayout === 'panel' || !laptop) && <RefinementsPanel />} */}

        <div className="grow flex flex-col gap-2 lg:gap-5 w-full">
          {/* <RefinementsBar
            showRefinements={refinementsLayout === 'bar' && laptop}
          /> */}

          <NoResultsHandler>
            <InfiniteHits viewMode={viewMode} showLess={true} showMore={true} />
          </NoResultsHandler>
        </div>
      </div>
    </div>
  )
}
