/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

import Header from '@/components/Header'
import DefaultLayout from '@/layouts/default-layout'
import { reloadPageAtom } from '@/lib/atomConfig'

const Footer = dynamic(
  () => import(/* webpackChunkName: 'Footer' */ '@/components/Footer'),
  {
    ssr: false,
  }
)

interface Props {
  title?: string
}

export default function Applayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  const [reloadPage, setReloadPage] = useAtom(reloadPageAtom)

  useEffect(() => {
    if (reloadPage) {
      setReloadPage(false)
    }
  }, [])

  return (
    <DefaultLayout>
      <Head>
        <title>{title} | Livehealthy e-commerce store </title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </DefaultLayout>
  )
}
