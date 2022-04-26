import OrderSummary from '@/components/Checkout/OrderSummary'
import SelectPaymentMethod from '@/components/Checkout/SelectPaymentMethod'

export default function PaymentMethod() {
  return (
    <div className="flex flex-col w-1/3 w-full">
      <SelectPaymentMethod />
      <OrderSummary />
    </div>
  )
}
