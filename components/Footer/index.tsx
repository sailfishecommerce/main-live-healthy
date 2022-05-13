import dynamic from 'next/dynamic'

const DynamicFooterLink = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicFooterLink' */ '@/components/Footer/FooterLink'
    )
)

const DynamicFooterDeals = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicFooterDeals' */ '@/components/Footer/FooterDeals'
    )
)

const DynamicFooterAddress = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicFooterAddress' */ '@/components/Footer/FooterAddress'
    )
)

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row  items-start px-6 md:px-0">
        <DynamicFooterAddress />
        <DynamicFooterLink />
        <DynamicFooterDeals />
      </div>
    </footer>
  )
}
