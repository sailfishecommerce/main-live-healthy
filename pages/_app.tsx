// import '../lib/wdyr'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useMemo } from 'react'

import { scrollToTop } from '@/utils/scrollToTop'

import '@/styles/_index.css'
import '@/styles/index.css'
import '@/styles/global.css'

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

const TrustmateWidget = dynamic(
  (): any =>
    import(
      /* webpackChunkName: 'TrustmateWidget' */ '@/components/Widget/TrustmateWidget'
    )
)

const Loader: any = dynamic(
  (): any =>
    import(/* webpackChunkName: 'Loader' */ '@/components/Loader/Loader')
)

export default function App({ Component, pageProps, router }: AppProps) {
  const isCatalogPage = useMemo(
    () => router?.pathname === '/collection/[[...slugs]]',
    [router?.pathname]
  )
  return (
    <ProviderLayout>
      <LayoutWrapper>
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
            />
          </Head>
          <Loader layout={isCatalogPage ? 'bar' : 'overlay'} />
          <TrustmateWidget>
            <AnimatePresence
              exitBeforeEnter={true}
              onExitComplete={scrollToTop}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </TrustmateWidget>
        </>
      </LayoutWrapper>
    </ProviderLayout>
  )
}
