import OrderSummary from '@/components/Checkout/OrderSummary'
import AirwallexPaymentMethod from '@/components/Payment/AirwallexPaymentMethod'
import BankTransferPaymentMethod from '@/components/Payment/BankTransferPaymentMethod'
import PaymentWithStripe from '@/components/Payment/PaymentWithStripe'
import { useCart, useMediaQuery } from '@/hooks'

export default function PaymentMethod() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const mobileDevice = useMediaQuery('(max-width:768px)')

  return (
    <div className="flex flex-col w-full">
      {mobileDevice && <OrderSummary cart={cart} />}
      <div className="flex w-full flex-col bg-white rounded-md p-4 mb-2">
        <div className="payment-methods flex items-center justify-between">
          <h3 className="font-semibold text-xl mb-4">
            3.Payment method & Order Total
          </h3>
        </div>
        <p className="text-base mb-2">
          For credit/debit card, you can pay via Paypal. No Paypal account
          required.
        </p>
        {cart?.shipmentTotal > 0 ? (
          <>
            <PaymentWithStripe title="Stripe" />
            <AirwallexPaymentMethod />
            <BankTransferPaymentMethod />
          </>
        ) : (
          cart !== null && <OrderSummary cart={cart} />
        )}
      </div>
    </div>
  )
}
