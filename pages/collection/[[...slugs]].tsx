import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

import Collection from '@/components/Collection'
import Applayout from '@/layouts/app-layout'
import {
  getServerSidePropsPage,
  // SearchPageLayout,
} from '@/layouts/search-page-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'

const SearchPageLayout = dynamic(() =>
  import(
    /* webpackChunkName: 'SearchPageLayout' */ '@/layouts/search-page-layout'
  ).then((mod: any) => mod.SearchPageLayout)
)

function CollectionPage(props: SearchPageLayoutProps) {
  return (
    <Applayout title="Collection page">
      <SearchPageLayout {...props}>
        <Collection />
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(CollectionPage, context)

export default CollectionPage
