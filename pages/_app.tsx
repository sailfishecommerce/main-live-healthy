import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import ErrorBoundaryWrapper from '@/components/ErrorBoundary'
import LayoutMetatag from '@/components/Metatag/LayoutMetatag'
import { scrollToTop } from '@/utils/scrollToTop'

import '@/styles/_index.css'
import '@/styles/index.css'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

const LayoutWrapper = dynamic(
  (): any =>
    import(/* webpackChunkName: 'LayoutWrapper' */ '@/layouts/layout-wrapper'),
  {
    ssr: false,
  }
)

const ProviderLayout = dynamic(
  (): any =>
    import(/* webpackChunkName: 'ProviderLayout' */ '@/layouts/provider-layout')
)

const Loader: any = dynamic(
  (): any =>
    import(/* webpackChunkName: 'Loader' */ '@/components/Loader/Loader'),
  { ssr: false }
)

export default function App({ Component, pageProps, router }: AppProps) {
  const isCatalogPage = useMemo(
    () =>
      router?.pathname === '/collection/[[...slugs]]' ||
      router?.pathname === '/vendor/[[...slugs]]' ||
      router?.pathname === '/' ||
      router?.pathname.includes('/product') ||
      router?.pathname === '/search/[[...slugs]]',
    [router?.pathname]
  )

  return (
    <>
      <LayoutMetatag />
      <ErrorBoundaryWrapper>
        <ProviderLayout>
          <LayoutWrapper>
            <Loader layout={isCatalogPage ? 'bar' : 'overlay'} />
            <AnimatePresence
              exitBeforeEnter={true}
              onExitComplete={scrollToTop}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </LayoutWrapper>
        </ProviderLayout>
      </ErrorBoundaryWrapper>
    </>
  )
}
