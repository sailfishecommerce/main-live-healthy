import type { GetServerSidePropsContext } from 'next'
import { Configure } from 'react-instantsearch-dom'

import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

export default function SearchPage(props: SearchPageLayoutProps) {
  return (
    <SearchPageLayout {...props}>
      <Configure />
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(SearchPage, context)
