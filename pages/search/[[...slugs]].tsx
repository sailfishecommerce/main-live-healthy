import { useAtomValue } from 'jotai/utils'
import type { GetServerSidePropsContext } from 'next'
import { Configure } from 'react-instantsearch-dom'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import InfiniteHits from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import ProductHitCard from '@/components/Cards/ProductHitCard'
import { Container } from '@/components/Container'
import RefinementsBar from '@/components/RefinementsBar/refinements-bar'
import RefinementsPanel from '@/components/RefinementsPanel/refinements-panel'
import { viewModeAtom } from '@/components/ViewModes'
import { configAtom } from '@/config/config'
import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

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
        <Container className="mt-1">
          <Configure query={searchQuery} />
          <div className="container flex items-center mx-auto justify-between">
            <h1 className="font-bold text-xl">
              Showing {totalHits} {result} for &#34;{hitsObj?.query}&#34;
            </h1>
            <h1></h1>
          </div>
          <Container className="flex flex-col gap-2 container lg:mx-auto lg:mb-10 lg:mt-10 lg:gap-10">
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
          </Container>
        </Container>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (
  context: GetServerSidePropsContext | any
) => {
  return getServerSidePropsPage(SearchPage, context, {
    props: { searchQuery: context.params?.slugs[0] },
  })
}
