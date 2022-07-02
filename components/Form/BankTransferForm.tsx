/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import BankTransferList from '@/components/Form/BankTransferList'
import { sendBankTransfer } from '@/hooks/useVbout'
import checkoutFormContent from '@/json/checkout-form.json'
import { checkoutAddressAtom } from '@/lib/atomConfig'

export default function BankTransferForm() {
  const [bank, setBank] = useState('')
  const [submit, setSubmit] = useState(false)
  const [checkoutAddress] = useAtom(checkoutAddressAtom)
  const setBankHandler = (e: any) => setBank(e.target.value)
  const router = useRouter()

  useEffect(() => {
    if (submit) {
      const { email, firstName, lastName } = checkoutAddress.shipping
      sendBankTransfer(email, bank, firstName, lastName)
        .then(() => {
          setSubmit(false)
          toast.success(`An email has been sent to ${email}`)
          router.push('/checkout-complete')
        })
        .catch(() => {
          setSubmit(false)
        })
    }
  }, [submit])

  function submitHandler(e: any, formState: boolean) {
    e.preventDefault()
    setSubmit(formState)
  }

  return (
    <div>
      <table className="manualTransfer mb-3 w-full mt-3">
        <thead>
          <tr className="border-b">
            <th className="text-sm md:text-md">CURRENCY</th>
            <th className="text-sm md:text-md">BANK LOCATION</th>
          </tr>
        </thead>
        <tbody>
          {checkoutFormContent.bankTransfer.content.map(
            (content: any, index: number) => (
              <BankTransferList
                key={index}
                content={content}
                onChange={setBankHandler}
              />
            )
          )}
        </tbody>
      </table>
      <button
        type="submit"
        aria-label="Submit"
        className="border-2 border-red-500 rounded-md p-2 mx-auto flex my-4 hover:bg-red-500 hover:text-white"
        onClick={(e) => submitHandler(e, true)}
      >
        Submit
      </button>
    </div>
  )
}
