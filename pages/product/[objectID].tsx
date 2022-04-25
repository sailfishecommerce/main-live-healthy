import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import getProductObjectID from '@/lib/getProductObjectId'

const DynamicProductOverview = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductOverview' */ '@/components/Product/ProductOverview'
    ),
  {
    ssr: false,
  }
)

export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

export default function Product({ objectID, ...props }: ProductPageProps) {
  const productObjectID = getProductObjectID(objectID)
  const hit = props?.resultsState?.rawResults[0]?.hits[0]
  return (
    <SearchPageLayout {...props}>
      <Container className="mt-14">
        <Configure filters={`objectID:${productObjectID}`} />
        {/* <Hits hitComponent={ProductOverview} /> */}
        <DynamicProductOverview hit={hit} />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })
}
