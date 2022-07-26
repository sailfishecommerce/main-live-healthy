// import CheckoutAddress from '@/components/Checkout/CheckoutAddress'
import DisplayCheckoutView from '@/components/Checkout/DisplayCheckoutView'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import ReviewOrder from '@/components/Checkout/ReviewOrder'

export default function displayCheckoutView(checkoutStep: number) {
  switch (checkoutStep) {
    case 0:
      return <ReviewOrder />
    case 1:
      return <DisplayCheckoutView />
    case 2:
      return <PaymentMethod />
    default:
      return <ReviewOrder />
  }
}
