import DeliveryAddress from '@/components/Checkout/DeliveryAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import ReviewOrder from '@/components/Checkout/ReviewOrder'

export default function displayCheckoutView(checkoutStep: number) {
  switch (checkoutStep) {
    case 0:
      return <ReviewOrder />
    case 1:
      return <DeliveryAddress />
    case 2:
      return <PaymentMethod />
    default:
      return <ReviewOrder />
  }
}
