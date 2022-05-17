import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import InfiniteHits from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import { Container } from '@/components/Container'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import { useMediaQuery } from '@/hooks'
import { useIsMounted } from '@/hooks/useIsMounted'

const RefinementsBar = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'RefinementsBar' */ '@/components/RefinementsBar/refinements-bar'
    ),
  {
    ssr: false,
  }
)

const RefinementsPanel = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'refinements-panel' */ '@/components/RefinementsPanel/refinements-panel'
    ),
  {
    ssr: false,
  }
)

export default function Index() {
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)

  const laptop = useMediaQuery('(min-width:1200px)')
  const isMounted = useIsMounted(true)
  const isLaptop = laptop && isMounted()
  return (
    <Container className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-0 lg:gap-0">
      <Breadcrumb attributes={breadcrumbAttributes} />
      <div className="flex flex-col lg:flex-row">
        {(refinementsLayout === 'panel' || !isLaptop) && <RefinementsPanel />}

        <div className="grow flex flex-col gap-2 lg:gap-5 w-full">
          <RefinementsBar
            showRefinements={refinementsLayout === 'bar' && isLaptop}
          />

          <NoResultsHandler>
            <InfiniteHits viewMode={viewMode} showLess={true} showMore={true} />
          </NoResultsHandler>
        </div>
      </div>
    </Container>
  )
}
