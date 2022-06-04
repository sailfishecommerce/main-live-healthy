import ContactBanner from '@/components/Banners/ContactBanner'
import ContactMap from '@/components/Contactus/ContactMap'
import ContactusCardGroup from '@/components/Contactus/ContactusCardGroup'
import ContactForm from '@/components/Form/ContactForm'
import Applayout from '@/layouts/app-layout'

export default function ContactUs() {
  return (
    <Applayout title="Contact us">
      <ContactBanner />
      <div className="container">
        <ContactusCardGroup />
        <div
          className="container flex-col lg:flex-ow flex m-auto justify-between"
          id="map"
        >
          <ContactMap />
          <ContactForm />
        </div>
      </div>
    </Applayout>
  )
}
