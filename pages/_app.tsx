// import '../lib/wdyr'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'

import Loader from '@/components/Loader/Loader'
import TrustmateWidget from '@/components/Widget/TrustmateWidget'
import LayoutWrapper from '@/layouts/layout-wrapper'
import ProviderLayout from '@/layouts/provider-layout'
import { scrollToTop } from '@/utils/scrollToTop'

import '@/styles/_index.css'
import '@/styles/index.css'
import '@/styles/global.css'

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
