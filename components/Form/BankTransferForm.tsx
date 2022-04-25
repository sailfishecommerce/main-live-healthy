import { useCallback, useState } from 'react'
import checkoutFormContent from '@/json/checkout-form.json'
import { sendBankTransfer } from '@/hooks/useVbout'
import { useAppSelector } from '@/hooks/useRedux'
import { useToast } from '@/hooks'
import BankTransferList from '@/components/Form/BankTransferList'

export default function BankTransferForm() {
  const [bank, setBank] = useState('')
  const { paymentForm }: any = useAppSelector((state) => state.payment)
  const { isLoading, hasError, isSuccessful } = useToast()

  const setBankHandler = useCallback((e: any) => setBank(e.target.value), [])

  function submitHandler(e: any) {
    e.preventDefault()
    const loading = isLoading()
    sendBankTransfer(paymentForm?.email, bank)
      .then((response) => {
        isSuccessful(loading, `An email has been sent to ${paymentForm?.email}`)
      })
      .catch((error) => {
        hasError(loading, 'an error occured')
      })
  }
  return (
    <form onSubmit={submitHandler}>
      <table className="manualTransfer mb-3 w-full">
        <thead>
          <tr className="border-b">
            <th className="text-sm tablet:text-md">CURRENCY</th>
            <th className="text-sm tablet:text-md">BANK LOCATION</th>
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
