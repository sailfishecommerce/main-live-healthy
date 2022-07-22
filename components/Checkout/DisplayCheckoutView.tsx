import { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import CheckoutAddress from '@/components/Checkout/CheckoutAddress'
import ShippingRate from '@/components/Checkout/ShippingRate'
import CheckoutButton from '@/components/MobileCheckoutView/CheckoutButton'
import { useCart } from '@/hooks'

export default function DisplayCheckoutView() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const [progressIndicator, setProgressIndicator] = useState('address')

  return (
    <div className="displayCheckoutView flex flex-col">
      <div>
        {cart?.shipping !== null &&
        cart?.billing !== null &&
        progressIndicator === 'address' ? (
          <CheckoutAddress />
        ) : (
          <ShippingRate />
        )}
      </div>
      <div className="button-view">
        {progressIndicator !== 'address' && (
          <CheckoutButton
            className="border border-black text-black"
            onClick={() => setProgressIndicator('address')}
          >
            <BsArrowLeft className="mr-3 font-bold mt-1" />
            Previous step
          </CheckoutButton>
        )}

        <CheckoutButton
          className="bg-tan-hide text-white"
          onClick={() => setProgressIndicator('shipping')}
        >
          Next step <BsArrowRight className="ml-3 font-bold mt-2" />
        </CheckoutButton>
      </div>
    </div>
  )
}
