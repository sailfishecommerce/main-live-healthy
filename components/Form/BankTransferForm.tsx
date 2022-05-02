import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import BankTransferList from '@/components/Form/BankTransferList'
import { useAppSelector } from '@/hooks/useRedux'
import { sendBankTransfer } from '@/hooks/useVbout'
import checkoutFormContent from '@/json/checkout-form.json'

export default function BankTransferForm() {
  const [bank, setBank] = useState('')
  const [submit, setSubmit] = useState(false)
  const { paymentForm }: any = useAppSelector((state) => state.payment)
  const setBankHandler = (e: any) => setBank(e.target.value)

  useEffect(() => {
    if (submit) {
      sendBankTransfer(paymentForm?.email, bank)
        .then((response) => {
          console.log('response', response)
          setSubmit(false)
          toast.success(`An email has been sent to ${paymentForm?.email}`)
        })
        .catch((error) => {
          setSubmit(false)
          console.log('response error', error)
        })
    }
  }, [submit])

  function submitHandler(e: any, formState: boolean) {
    e.preventDefault()
    setSubmit(formState)
  }

  return (
    <form onSubmit={(e) => submitHandler(e, true)}>
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
      >
        Submit
      </button>
    </form>
  )
}
