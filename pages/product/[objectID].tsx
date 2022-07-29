import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

const DynamicProductOverview = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductOverview' */ '@/components/Product/ProductOverview'
    ),
  {
    ssr: false,
  }
)

export default function Product({ objectID, ...props }: ProductPageProps) {
  const hit = props?.resultsState?.rawResults[0]?.hits[0]

  return (
    <Applayout>
      <SearchPageLayout {...props}>
        <Container className="mt-0">
          <Configure filters={`slug:${objectID}`} />
          <Suspense fallback={<SpinnerRipple centerRipple />}>
            <DynamicProductOverview hit={hit} />
          </Suspense>
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
