import { useAtom } from 'jotai'
import { useState } from 'react'

import { FormInput } from '@/components/Form/NewFormElement'
import { useCart } from '@/hooks'
import { modalAtom } from '@/lib/atomConfig'

const input = {
  type: 'email',
  name: 'email',
  id: 'email-checkout',
  placeholder: 'Enter your email address',
}

export default function ContactInformationForm() {
  const [email, setEmail] = useState('')
  const [, setModal]: any = useAtom<'SLIDING-CART' | null>(modalAtom)
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()

  function updateModalView() {
    return setModal('MODAL_LOGIN')
  }

  function inputChangeHandler(e: any) {
    setEmail(e.target.value)
  }
  console.log('email', email)
  return (
    <div className="contact-information border-b pb-2 mb-6">
      <div className="flex flex-col mb-4">
        <h5>Contact information</h5>
        {cart?.accountLoggedIn === null && (
          <p className="text-gray-500 font-light">
            Already have an account?{' '}
            <button
              type="button"
              aria-label="log in"
              className="mountain-mist font-semibold"
              onClick={updateModalView}
            >
              Log in
            </button>
          </p>
        )}
      </div>
      <FormInput input={input} onChangeHandler={inputChangeHandler} />
      <span className="flex items-center">
        <input type="checkbox" className="mr-4 -mt-4" />
        <div className="text flex flex-col mb-4">
          <p>Send me email for my order details & shipping updates.</p>
          <p>Latest & exclusive offers from LiveHealthy!</p>
        </div>
      </span>
    </div>
  )
}
