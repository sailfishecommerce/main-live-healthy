import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

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
  const hit = props?.resultsState?.rawResults[0]?.hits[0]
  return (
    <Applayout title="Product page">
      <SearchPageLayout {...props}>
        <Container className="mt-0">
          <Configure filters={`slug:${objectID}`} />
          <DynamicProductOverview hit={hit} />
        </Container>
      </SearchPageLayout>
    </Applayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })
}
