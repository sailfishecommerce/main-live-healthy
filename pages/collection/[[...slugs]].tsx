import type { GetServerSidePropsContext } from 'next'

import Collection from '@/components/Collection'
import ErrorBoundaryWrapper from '@/components/ErrorBoundary'
import CategoryMetatag from '@/components/Metatag/CategoryMetatag'
import Applayout from '@/layouts/app-layout'
import {
  SearchPageLayout,
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'

interface Props extends SearchPageLayoutProps {
  slugs: string[]
}

function CollectionPage({ slugs, ...props }: Props) {
  return (
    <Applayout title="Collection page">
      {slugs?.length > 0 && <CategoryMetatag slug={slugs[0]} />}
      <SearchPageLayout {...props}>
        <ErrorBoundaryWrapper>
          <Collection />
        </ErrorBoundaryWrapper>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return getServerSidePropsPage(CollectionPage, context, {
    props: { slugs: context.params?.slugs },
  })
}
export default CollectionPage
