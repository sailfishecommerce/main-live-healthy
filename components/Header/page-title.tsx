import Head from 'next/head'

interface Props {
  title: string
}

export default function Pagetitle({ title }: Props) {
  return (
    <Head>
      <title>{title} | Sailfish e-commerce online store </title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
      />
    </Head>
  )
}
