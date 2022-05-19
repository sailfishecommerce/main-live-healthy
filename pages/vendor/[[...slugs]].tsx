import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

import Collection from '@/components/Collection'
import Applayout from '@/layouts/app-layout'
import { getServerSidePropsPage } from '@/layouts/search-page-layout'

const SearchPageLayout = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SearchPageLayout' */ '@/layouts/search-page-layout'
    )
)

function CollectionPage({ slugs, ...props }: any) {
  return (
    <Applayout title="Collection page">
      <SearchPageLayout {...props}>
        <Configure filters={`vendor:${slugs}`} />
        <Collection />
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(CollectionPage, context, {
    props: { slugs: context.params?.slugs },
  })

export default CollectionPage
