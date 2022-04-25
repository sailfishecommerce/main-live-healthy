import { memo } from "react";
import CheckoutPaymentMethod from "@/components/Form/CheckoutPaymentMethod";
import ShippingCheckoutForm from "@/components/Form/ShippingCheckoutForm";

function CheckoutFormComponent() {
  return (
    <div className="flex flex-col px-4" id="shipping-form">
      <ShippingCheckoutForm />
      <CheckoutPaymentMethod />
    </div>
  );
}

const CheckoutForm = memo(CheckoutFormComponent);

export default CheckoutForm;

// CheckoutForm.whyDidYouRender = true;
