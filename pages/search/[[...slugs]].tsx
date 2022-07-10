import { useAtomValue } from 'jotai/utils'
import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

// import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import ProductHitCard from '@/components/Cards/ProductHitCard'
import ErrorBoundaryWrapper from '@/components/ErrorBoundary'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  SearchPageLayout,
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'

const NoResultsHandler = dynamic(
  (): any =>
    import(
      /* webpackChunkName: 'NoResultsHandler' */ '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
    ).then((mod) => mod.NoResultsHandler),
  {
    ssr: false,
  }
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

const Breadcrumb = dynamic(
  () =>
    import(
      /* webpackChunkName: 'Breadcrumb' */ '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
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

const InfiniteHits = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InfiniteHits' */ '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
    ),
  {
    ssr: false,
  }
)

export type SearchPageProps = SearchPageLayoutProps & {
  searchQuery: string
}

export default function SearchPage({ searchQuery, ...props }: SearchPageProps) {
  const hitsObj = props?.resultsState?.rawResults[0]
  const totalHits = props?.resultsState?.rawResults[0].nbHits
  const result = totalHits > 1 ? 'results' : 'result'
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)

  return (
    <Applayout title="Search for products">
      <SearchPageLayout {...props}>
        <ErrorBoundaryWrapper>
          <Configure query={searchQuery} />
          <div className="container flex items-center mx-auto justify-between">
            <h1 className="font-bold text-xl">
              Showing {totalHits} {result} for &#34;{hitsObj?.query}&#34;
            </h1>
          </div>
          <div className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-10 lg:gap-0">
            <Breadcrumb attributes={breadcrumbAttributes} />
            <div className="flex flex-col lg:flex-row">
              {(refinementsLayout === 'panel' || true) && <RefinementsPanel />}
              <div className="grow flex flex-col gap-2 lg:gap-4">
                <RefinementsBar
                  showRefinements={refinementsLayout === 'bar' && true}
                />

                <NoResultsHandler>
                  <InfiniteHits
                    hitComponent={ProductHitCard}
                    viewMode={viewMode}
                    showLess={true}
                    showMore={true}
                  />
                </NoResultsHandler>
              </div>
            </div>
          </div>
        </ErrorBoundaryWrapper>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (
  context: GetServerSidePropsContext | any
) => {
  return getServerSidePropsPage(SearchPage, context, {
    props: { searchQuery: context?.params?.slugs[0] },
  })
}
