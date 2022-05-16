import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

const Collection = dynamic<any>(
  () => import(/* webpackChunkName: 'Collections' */ '@/components/Collection'),
  {
    ssr: false,
  }
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

// CollectionPage.whyDidYouRender = true

export default CollectionPage
