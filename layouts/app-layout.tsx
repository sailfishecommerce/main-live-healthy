import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'

import Header from '@/components/Header'
import DefaultLayout from '@/layouts/default-layout'

const Footer = dynamic(
  () => import(/* webpackChunkName: 'Footer' */ '@/components/Footer'),
  {
    ssr: false,
  }
)

interface Props {
  title: string
}

export default function Applayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <DefaultLayout>
      <Head>
        <title>{title} | Sailfish e-commerce online store </title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
        />
      </Head>
      <Header />
      <main className="main-view">{children}</main>
      <Footer />
      <style jsx>
        {`
          .main-view {
            min-height: 100vh;
          }
        `}
      </style>
    </DefaultLayout>
  )
}
