import ContactBanner from '@/components/Banners/ContactBanner'
import ContactMap from '@/components/Contactus/ContactMap'
import ContactusCard from '@/components/Contactus/ContactusCard'
import PartnerOutlet from '@/components/Contactus/PartnerOutlet'
import ContactForm from '@/components/Form/ContactForm'
import Applayout from '@/layouts/app-layout'

export default function ContactUs() {
  return (
    <Applayout title="Contact us">
      <ContactBanner />
      <ContactusCard />
      <PartnerOutlet />
      <div
        className="w-full flex-col lg:flex-row flex m-auto justify-between"
        id="map"
      >
        <ContactMap />
        <ContactForm />
      </div>
    </Applayout>
  )
}
