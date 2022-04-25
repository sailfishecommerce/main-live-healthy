import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useMemo } from 'react'

import { Loader } from '@/components/Loader/Loader'
import { Overlay } from '@/components/Overlay'
import TrustmateWidget from '@/components/Widget/TrustmateWidget'
import { AppLayout } from '@/layouts/app-layout'
import { isDev } from '@/utils/env'
import { scrollToTop } from '@/utils/scrollToTop'
import { Dev } from '@dev/dev'

import '@/styles/_index.css'
import '@/styles/index.css'
import '@/styles/global.css'
/// #if DEV
/// #endif

const Header = dynamic<any>(
  () => import(/* webpackChunkName: 'header' */ '@/components/Header')
)

export const LayoutWrapper = dynamic(
  (): any =>
    import(/* webpackChunkName: 'common' */ '@/layouts/layout-wrapper'),
  {
    ssr: false,
  }
)

export const Footer = dynamic(
  () => import(/* webpackChunkName: 'common' */ '@/components/Footer')
)

export default function App({ Component, pageProps, router }: AppProps) {
  const isCatalogPage = useMemo(
    () => router?.pathname === '/catalog/[[...slugs]]',
    [router?.pathname]
  )

  return (
    <AppLayout>
      <TrustmateWidget>
        <LayoutWrapper>
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
            />
          </Head>
          <Loader layout={isCatalogPage ? 'bar' : 'overlay'} />
          <Header />
          <AnimatePresence exitBeforeEnter={true} onExitComplete={scrollToTop}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Footer />
          <Overlay />
          {isDev && <Dev />}
        </LayoutWrapper>
      </TrustmateWidget>
    </AppLayout>
  )
}
