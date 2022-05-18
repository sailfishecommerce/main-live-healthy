import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { configAtom } from '@/config/config'
import { useSearchClient } from '@/hooks/useSearchClient'
import { useSearchInsights } from '@/hooks/useSearchInsights'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type ProviderLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

const MediaContextProvider = () =>
  import(/* webpackChunkName: 'MediaContextProvider' */ '@/lib/media').then(
    (mod) => mod.MediaContextProvider
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  const { setUserToken } = useAtomValue(configAtom)

  // Initialize search client
  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)

  // Initialize search insights
  useSearchInsights({
    appId,
    searchApiKey,
    setUserToken,
  })

  const queryClient = new QueryClient()

  return (
    <JotaiProvider initialValues={get()}>
      <QueryClientProvider client={queryClient}>
        <MediaContextProvider>
          <LazyMotion features={loadFramerMotionFeatures} strict={true}>
            {children}
          </LazyMotion>
        </MediaContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </JotaiProvider>
  )
}
