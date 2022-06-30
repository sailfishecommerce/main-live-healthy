/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import ContactForMoreForm from '@/components/Form/ContactForMoreForm'
import Modal from '@/components/Modal'
import type { ModalType } from '@/typings/types'

interface Props extends ModalType {
  productName: string
}

export default function ContactForMoreModal({
  show,
  onHide,
  productName,
}: Props) {
  const [stage, setStage] = useState(0)

  function onClose() {
    setStage(0)
    onHide()
  }

  return (
    <Modal title="" modal={show} modalHandler={onClose}>
      <>
        <div className="flex title flex-col m-auto">
          <h4 className="text-center mb-0">Larger Order Enquiry</h4>
          <p className="mb-0 text-center">for</p>
          <h4 className="text-center mb-0">{productName}</h4>
        </div>

        {displayFormContent(stage, setStage)}
      </>
    </Modal>
  )
}

function ContactMessage() {
  return (
    <div className="flex m-auto text-center flex-col mb-3">
      <div className="text">
        <p className="mb-0">Thank you for your message.</p>
        <p>We will be in touch with you shortly.</p>
      </div>
      <div className="icon mt-5">
        <img src="/img/check-mark-verified.gif" alt="message sent" />
      </div>
    </div>
  )
}

function displayFormContent(
  stage: number,
  setStage: Dispatch<SetStateAction<number>>
) {
  switch (stage) {
    case 0: {
      return <ContactForMoreForm setStage={setStage} />
    }
    case 1: {
      return <ContactMessage />
    }
    default:
      return null
  }
}
