import { FaRegMoneyBillAlt } from "react-icons/fa";

import Accordion from "@/components/accordion";
import BankTransferForm from "@/components/form/BankTransferForm";

export default function BankTransferPaymentMethod({ isGray }:any) {
  return (
    <Accordion
      stage={3}
      title="Bank Transfer"
      icon={<FaRegMoneyBillAlt size={32} />}
      isGray={isGray}
    >
      <p className="mt-2 mb-0 text-sm md:text-md text-center">
        Please select your preferred country and currency pair for payment to
        our bank accounts
      </p>
      <BankTransferForm />
    </Accordion>
  );
}
