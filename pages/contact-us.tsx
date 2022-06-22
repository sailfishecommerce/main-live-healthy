/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'

import ContactBanner from '@/components/Banners/ContactBanner'
import ContactMap from '@/components/Contactus/ContactMap'
import ContactusCardGroup from '@/components/Contactus/ContactusCardGroup'
import ContactForm from '@/components/Form/ContactForm'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import Applayout from '@/layouts/app-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'

export default function ContactUs() {
  const [contactusData, setContactusData] = useState(null)
  const [loading, setLoading] = useState(false)
  const dbRef = 'articles/team/contact-us/content'

  useEffect(() => {
    if (contactusData === null) {
      readData()
    }
  }, [])

  function readData() {
    const { readFromDB } = firebaseDatabase()
    readFromDB(dbRef, setContactusData, setLoading)
  }

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
