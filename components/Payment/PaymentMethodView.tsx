export default function PaymentMethodView() {
  const paymentMethodIcons = [
    "/visa.png",
    "/mastercard.png",
    "/paypal.png",
    "/american-express.png",
    "/bank-transfer.png",
  ];
  return (
    <div className="flex flex-col">
      <h5 className="text-lg my-2 font-medium">Payment methods</h5>
      <div className="payment-icons flex items-center my-4 justify-between">
        {paymentMethodIcons.map((item, index) => (
          <div key={index} className="md:w-24 ">
            <img src={item} alt="payment-icon" />
          </div>
        ))}
      </div>
      <p className="gray-lavender md:my-4 my-2 text-sm md:text-md">
        We accept bank deposits through all major networks globally including
        AHC, Fedwire, SWIFT, IBAN and BSB. Orders shipped after new partners are
        manually verified. Additional documentation might be requested
      </p>
    </div>
  );
}
