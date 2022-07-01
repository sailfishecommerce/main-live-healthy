import type { GetServerSidePropsContext } from 'next'

import Collection from '@/components/Collection'
import ErrorBoundaryWrapper from '@/components/ErrorBoundary'
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
        <ErrorBoundaryWrapper>
          <Collection />
        </ErrorBoundaryWrapper>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return getServerSidePropsPage(CollectionPage, context)
}
export default CollectionPage
