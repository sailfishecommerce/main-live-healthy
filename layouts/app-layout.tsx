import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { configAtom } from '@/config/config'
import { useSearchClient } from '@/hooks/useSearchClient'
import { useSearchInsights } from '@/hooks/useSearchInsights'
import { MediaContextProvider } from '@/lib/media'
import store from '@/redux/store'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)

export function AppLayout({ children }: AppLayoutProps) {
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
  const persistor = persistStore(store)
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <JotaiProvider initialValues={get()}>
        <PersistGate loading={null} persistor={persistor}>
          <MediaContextProvider>
            <LazyMotion features={loadFramerMotionFeatures} strict={true}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </LazyMotion>
          </MediaContextProvider>
        </PersistGate>
      </JotaiProvider>
    </Provider>
  )
}
