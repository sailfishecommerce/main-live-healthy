import type { GetServerSidePropsContext } from 'next'
import { Configure } from 'react-instantsearch-dom'

import Collection from '@/components/Collection'
import ErrorBoundaryWrapper from '@/components/ErrorBoundary'
import CategoryMetatag from '@/components/Metatag/CategoryMetatag'
import Applayout from '@/layouts/app-layout'
import {
  SearchPageLayout,
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'

function CollectionPage({ slugs, ...props }: any) {
  return (
    <Applayout title="Collection page">
      {slugs?.length > 0 && <CategoryMetatag slug={slugs[0]} type="vendor" />}
      <SearchPageLayout {...props}>
        <ErrorBoundaryWrapper>
          <Configure filters={`vendor:${slugs}`} />
          <Collection />
        </ErrorBoundaryWrapper>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(CollectionPage, context, {
    props: { slugs: context.params?.slugs },
  })

export default CollectionPage
