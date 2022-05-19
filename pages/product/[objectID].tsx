import type { GetServerSidePropsContext } from 'next'
import { Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import ProductOverview from '@/components/Product/ProductOverview'
import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import SearchPageLayout, {
  getServerSidePropsPage,
} from '@/layouts/search-page-layout'

export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

export default function Product({ objectID, ...props }: ProductPageProps) {
  const hit = props?.resultsState?.rawResults[0]?.hits[0]
  console.log('hit', hit)
  return (
    <Applayout title="Product page">
      <SearchPageLayout {...props}>
        <Container className="mt-0">
          <Configure filters={`slug:${objectID}`} />
          <ProductOverview hit={hit} />
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
