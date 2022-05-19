import { useAtomValue } from 'jotai/utils'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import { useUrlSync } from '@/components/@instantsearch/hooks/useUrlSync'
import { configAtom } from '@/config/config'
import { useUserToken } from '@/hooks/useUserToken'
import { isBrowser } from '@/utils/browser'
import { appId, searchApiKey, indexName } from '@/utils/env'
import { getResultsState } from '@/utils/getResultsState'
import { Search } from '@instantsearch/search'
import { urlToSearchState } from '@instantsearch/utils/url'

import type { BasicPageLayoutProps } from './basic-page-layout'
import { searchClientAtom } from './provider-layout'

export type SearchPageLayoutProps = BasicPageLayoutProps & {
  resultsState?: any
  searchState?: any
  userToken?: string
}

function SearchPageLayoutComponent({
  children,
  resultsState,
  searchState: initialSearchState,
  userToken: initialUserToken,
  ...props
}: SearchPageLayoutProps) {
  const { searchParameters: configSearchParameters } = useAtomValue(configAtom)
  const searchClient = useAtomValue(searchClientAtom)
  const { searchState, onSearchStateChange, createURL } = useUrlSync()
  const userTokenHookValue = useUserToken()
  const userToken = userTokenHookValue ? userTokenHookValue : initialUserToken

  const searchParameters = useMemo(
    () => ({
      userToken,
      enablePersonalization: Boolean(userToken),
      ...configSearchParameters,
    }),
    [userToken, configSearchParameters]
  )

  return (
    <main>
      <Search
        indexName={indexName}
        searchClient={searchClient}
        searchState={isBrowser ? searchState : initialSearchState}
        searchParameters={searchParameters}
        resultsState={resultsState}
        createURL={createURL}
        onSearchStateChange={onSearchStateChange}
        {...props}
      >
        {children}
      </Search>
    </main>
  )
}

const SearchPageLayout = memo(SearchPageLayoutComponent, isEqual)
export default SearchPageLayout

export type GetServerSidePropsOptions = GetServerSidePropsResult<any>
export type GetStaticPropsOptions = GetStaticPropsResult<any>

export const getPropsPage = async (
  component: any,
  url?: string,
  options?: GetServerSidePropsOptions | GetStaticPropsOptions
) => {
  const { props, ...customOptions } = (options as { props: any }) || {}

  const searchState = urlToSearchState(url)
  const resultsState = await getResultsState({
    component,
    searchState,
    appId,
    searchApiKey,
    indexName,
    ...props,
  })

  return {
    props: {
      ...props,
      searchState,
      resultsState,
    },
    ...customOptions,
  }
}

export const getServerSidePropsPage = (
  component: any,
  context: GetServerSidePropsContext,
  options?: GetServerSidePropsOptions,
  url?: string
) => {
  const customOptions = (options as { props: any }) || {}

  const userTokenCookie = context?.req?.cookies?._ALGOLIA
  if (userTokenCookie) {
    customOptions.props = {
      ...customOptions?.props,
      userToken: userTokenCookie,
    }
  }

  return getPropsPage(
    component,
    url || context?.resolvedUrl || '',
    customOptions
  )
}

export const getStaticPropsPage = (
  component: any,
  url?: string,
  options?: GetServerSidePropsOptions
) => getPropsPage(component, url, options)
