import '../lib/wdyr'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Script from 'next/script'
import { useMemo } from 'react'

import { Loader } from '@/components/Loader/Loader'
import TrustmateWidget from '@/components/Widget/TrustmateWidget'
import ProviderLayout from '@/layouts/provider-layout'
import { scrollToTop } from '@/utils/scrollToTop'

import '@/styles/_index.css'
import '@/styles/index.css'
import '@/styles/global.css'

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
    () => router?.pathname === '/collection/[[...slugs]]',
    [router?.pathname]
  )
  return (
    <ProviderLayout>
      <LayoutWrapper>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
          />
        </Head>
        <Loader layout={isCatalogPage ? 'bar' : 'overlay'} />
        <TrustmateWidget>
          <AnimatePresence exitBeforeEnter={true} onExitComplete={scrollToTop}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </TrustmateWidget>
      </LayoutWrapper>
    </ProviderLayout>
  )
}
