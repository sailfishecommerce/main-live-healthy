// import AirwallexPaymentMethod from '@/components/Payment/AirwallexPaymentMethod'
import BankTransferPaymentMethod from '@/components/Payment/BankTransferPaymentMethod'
import PaymentWithStripe from '@/components/Payment/PaymentWithStripe'

export default function SelectPaymentMethod() {
  return (
    <div className="flex w-full flex-col bg-white rounded-md p-4 mb-2 h-full">
      <div className="payment-methods flex items-center justify-between">
        <h3 className="font-semibold text-xl mb-4">
          3.Payment method & Order Total
        </h3>{' '}
      </div>
      <>
        <PaymentWithStripe title="Stripe" />
        {/* <AirwallexPaymentMethod /> */}
        <BankTransferPaymentMethod />
      </>
    </div>
  )
}
