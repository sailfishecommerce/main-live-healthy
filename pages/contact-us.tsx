import dynamic from 'next/dynamic'

import ContactBanner from '@/components/Banners/ContactBanner'
import ContactusCard from '@/components/Contactus/ContactusCard'
import Applayout from '@/layouts/app-layout'

const DynamicContactMap = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ContactMap' */ '@/components/Contactus/ContactMap'
    )
)
const DynamicContactForm = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ContactForm' */ '@/components/Form/ContactForm'
    )
)
const DynamicPartnerOutlet = dynamic(
  () =>
    import(
      /* webpackChunkName: 'PartnerOutlet' */ '@/components/Contactus/PartnerOutlet'
    )
)

export default function ContactUs() {
  return (
    <Applayout title="Contact us">
      <ContactBanner />
      <ContactusCard />
      <DynamicPartnerOutlet />
      <div
        className="w-full flex-col lg:flex-row flex m-auto justify-between"
        id="map"
      >
        <DynamicContactMap />
        <DynamicContactForm />
      </div>
    </Applayout>
  )
}
