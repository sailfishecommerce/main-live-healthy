import {
  ContactCard,
  ContactCardWithAnchor,
} from '@/components/Contactus/ContactusCard'
import contactData from '@/json/contact-us.json'
import type { contactInfoType } from '@/types'

type ConntactInfoType = contactInfoType[]

export default function ContactusCardGroup() {
  const contactInfo: ConntactInfoType = contactData
  return (
    <section className="flex w-full mb-4 md:flex-row flex-col  justify-center mx-auto items-center">
      {contactInfo.map((content) => {
        return content.anchor ? (
          <ContactCardWithAnchor content={content} />
        ) : (
          <ContactCard content={content} />
        )
      })}
    </section>
  )
}
