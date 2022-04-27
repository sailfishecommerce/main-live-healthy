import { useAtomValue } from 'jotai/utils'
import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import { InfiniteHits } from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import { QueryRuleBanners } from '@/components/@instantsearch/widgets/query-rule-banners/query-rule-banners'
import { Container } from '@/components/Container'
import { ProductCardHit } from '@/components/ProductCard/product-card-hit'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
// import { useIsMounted } from '@/hooks/useIsMounted'
// import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

const RefinementsBar = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'search' */ '@/components/RefinementsBar/refinements-bar'
  ).then((mod) => mod.RefinementsBar)
)

const RefinementsPanel = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'refinements-panel' */ '@/components/RefinementsPanel/refinements-panel'
  ).then((mod) => mod.RefinementsPanel)
)

export default function Catalog(props: SearchPageLayoutProps) {
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)

  // const { laptop } = useTailwindScreens()
  // const isMounted = useIsMounted(true)
  // const isLaptop = laptop && isMounted()

  return (
    <SearchPageLayout {...props}>
      <Container className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-10 lg:gap-10">
        <Breadcrumb attributes={breadcrumbAttributes} />

        <QueryRuleBanners limit={1} />

        <div className="flex flex-col lg:flex-row">
          {(refinementsLayout === 'panel' || !true) && <RefinementsPanel />}

          <div className="grow flex flex-col gap-2 lg:gap-5">
            <RefinementsBar
              showRefinements={refinementsLayout === 'bar' && true}
            />

            <NoResultsHandler>
              <InfiniteHits
                hitComponent={ProductCardHit}
                viewMode={viewMode}
                showLess={true}
                showMore={true}
              />
            </NoResultsHandler>
          </div>
        </div>
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Catalog, context)
