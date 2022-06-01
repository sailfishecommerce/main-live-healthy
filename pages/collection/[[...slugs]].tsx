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
    <ErrorBoundary>
      <Applayout title="Collection page">
        <SearchPageLayout {...props}>
          <Collection />
        </SearchPageLayout>
      </Applayout>
    </ErrorBoundary>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return getServerSidePropsPage(CollectionPage, context)
}
export default CollectionPage
