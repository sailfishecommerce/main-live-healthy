/* eslint-disable no-nested-ternary */

import ContactBanner from '@/components/Banners/ContactBanner'
import ContactMap from '@/components/Contactus/ContactMap'
import ContactusCardGroup from '@/components/Contactus/ContactusCardGroup'
import ContactForm from '@/components/Form/ContactForm'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useDatabaseData from '@/hooks/useDatabaseData'
import Applayout from '@/layouts/app-layout'

export default function ContactUs() {
  const { dbdata: contactusData, loading } = useDatabaseData(
    'articles/team/contact-us/content'
  )

  return (
    <Applayout title="Contact us">
      <ContactBanner />
      <div className="container">
        {loading ? (
          <SpinnerRipple centerRipple />
        ) : contactusData !== null ? (
          <ContactusCardGroup contactusData={contactusData} />
        ) : (
          <p className="text-center font-bold text-xl">
            unable to fetch contact detals
          </p>
        )}
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
