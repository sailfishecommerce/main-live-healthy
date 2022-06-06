import PaymentMethod from '@/components/Checkout/PaymentMethod'
import ReviewOrder from '@/components/Checkout/ReviewOrder'
import ShippingAddress from '@/components/Checkout/ShippingAddress'

export default function displayCheckoutView(checkoutStep: number) {
  switch (checkoutStep) {
    case 0:
      return <ReviewOrder />
    case 1:
      return <ShippingAddress />
    case 2:
      return <PaymentMethod />
    default:
      return <ReviewOrder />
  }
}
