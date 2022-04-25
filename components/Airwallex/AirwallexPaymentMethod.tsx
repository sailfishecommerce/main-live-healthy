import AirwallexDropin from "@/components/Airwallex/AirwallexDropin";
import { useCart } from "@/hooks";
import useAirwallexPayment from "@/hooks/useAirwallexPayment";
import { useAppSelector } from "@/hooks/useRedux";
import Accordion from "@/components/Accordion";
import { BsCreditCard } from "react-icons/bs";

export default function AirwallexPaymentMethod() {
  const { useCartData } = useCart();
  const { paymentForm }: any = useAppSelector((state) => state.payment);
  const { data: cart } = useCartData();
  const { checkoutHandler } = useAirwallexPayment();

  function onCheckout() {
    checkoutHandler(cart, paymentForm);
  }

  const { clientSecret, paymentIntentId } = useAppSelector(
    (state) => state.airwallex
  );

  // onClick = { onCheckout };

  return (
    <Accordion
      stage={2}
      icon={<BsCreditCard size={32} />}
      title="Pay with Airwallex"
    >
      <span className="font-medium">Airwallex</span> - the safer, easier way to
      pay
      <AirwallexDropin
        intent_id={paymentIntentId}
        client_secret={clientSecret}
      />
    </Accordion>
  );
}
