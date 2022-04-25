import dynamic from 'next/dynamic'

import ContactBanner from '@/components/Banners/ContactBanner'
import ContactusCard from '@/components/Contactus/ContactusCard'
import Pagetitle from '@/components/Header/page-title'

const DynamicContactMap = dynamic(
  () =>
    import(/* webpackChunkName: 'common' */ '@/components/Contactus/ContactMap')
)
const DynamicContactForm = dynamic(
  () => import(/* webpackChunkName: 'common' */ '@/components/Form/ContactForm')
)
const DynamicPartnerOutlet = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Contactus/PartnerOutlet'
    )
)

export default function ContactUs() {
  return (
    <>
      <Pagetitle title="Contact us" />
      <ContactBanner />
      <ContactusCard />
      <DynamicPartnerOutlet />
      <div
        className="w-full flex-col laptop:flex-row flex m-auto justify-between"
        id="map"
      >
        <DynamicContactMap />
        <DynamicContactForm />
      </div>
    </>
  )
}
