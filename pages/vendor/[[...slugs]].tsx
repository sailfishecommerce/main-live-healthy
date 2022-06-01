import type { GetServerSidePropsContext } from 'next'
import { Configure } from 'react-instantsearch-dom'

import Collection from '@/components/Collection'
import ErrorBoundary from '@/components/ErrorBoundary'
import Applayout from '@/layouts/app-layout'
import {
  SearchPageLayout,
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'

function CollectionPage({ slugs, ...props }: any) {
  return (
    <ErrorBoundary>
      <Applayout title="Collection page">
        <SearchPageLayout {...props}>
          <Configure filters={`vendor:${slugs}`} />
          <Collection />
        </SearchPageLayout>
      </Applayout>
    </ErrorBoundary>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(CollectionPage, context, {
    props: { slugs: context.params?.slugs },
  })

export default CollectionPage
