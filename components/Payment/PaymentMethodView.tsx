/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */

export default function PaymentMethodView() {
  const paymentMethodIcons = [
    '/visa.png',
    '/mastercard.png',
    '/paypal.png',
    '/american-express.png',
    '/bank-transfer.webp',
  ]
  return (
    <div className="flex flex-col">
      <h5 className="text-lg my-2 font-medium">Payment methods</h5>
      <div className="payment-icons w-full lg:w-2/3 grid grid-cols-5 gap-4  items-center my-4 justify-between">
        {paymentMethodIcons.map((item, index) => (
          <img key={index} src={item} alt="payment-icon" />
        ))}
      </div>
      <p className="gray-lavender md:my-4 my-2 text-sm md:text-md">
        We accept bank deposits through all major networks globally including
        AHC, Fedwire, SWIFT, IBAN and BSB. Orders shipped after new partners are
        manually verified. Additional documentation might be requested
      </p>
    </div>
  )
}
