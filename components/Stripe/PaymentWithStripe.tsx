import Image from "next/image";
import { FaCcStripe } from "react-icons/fa";
import StripePaymentMethod from "@/components/Stripe/StripePaymentMethod";
import Accordion from "@/components/Accordion";

export default function PaymentWithStripe() {
  return (
    <Accordion
      stage={1}
      title="Pay with Credit Card (powered by Stripe)"
      icon={<FaCcStripe size={32} />}
    >
      <div className="body-title flex items-center justify-between mb-2">
        <p className="fs-sm mb-0">
          We accept following credit cards:&nbsp;&nbsp;
        </p>
        <div className="image-container flex">
          <Image
            src="/cards-alt.webp"
            width={150}
            height={30}
            alt="Cerdit Cards"
            layout="responsive"
          />
        </div>
      </div>
      <StripePaymentMethod />
    </Accordion>
  );
}
