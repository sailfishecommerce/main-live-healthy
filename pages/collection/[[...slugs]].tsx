import type { GetServerSidePropsContext } from 'next'

import Collection from '@/components/Collection'
import ErrorBoundary from '@/components/ErrorBoundary'
import Applayout from '@/layouts/app-layout'
import {
  SearchPageLayout,
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'

function CollectionPage(props: SearchPageLayoutProps) {
  return (
    <Applayout title="Collection page">
      <SearchPageLayout {...props}>
        <ErrorBoundary>
          <Collection />
        </ErrorBoundary>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(CollectionPage, context)

export default CollectionPage
