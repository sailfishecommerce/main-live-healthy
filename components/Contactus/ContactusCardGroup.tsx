import {
  ContactCard,
  ContactCardWithAnchor,
} from '@/components/Contactus/ContactusCard'
import contactData from '@/json/contact-us.json'

export default function ContactusCardGroup({ contactusData }: any) {
  const contactMainAddres: any = contactData[0]
  contactMainAddres.text = contactusData.mainStore

  const contactWorkingHours: any = contactData[1]
  contactWorkingHours.text = contactusData.workingHours

  const contactPhoneNumbers: any = contactData[2]
  contactPhoneNumbers.text = contactusData.phoneNumbers

  const contactEmails: any = contactData[3]
  contactEmails.text = contactusData.emails

  return (
    <section className="flex w-full mb-4 md:flex-row flex-col  justify-center mx-auto items-center">
      <ContactCardWithAnchor content={contactMainAddres} />
      <ContactCard content={contactWorkingHours} />
      <ContactCard content={contactPhoneNumbers} />
      <ContactCard content={contactEmails} />
    </section>
  )
}
