import { FaRegMoneyBillAlt } from 'react-icons/fa'

import Accordion from '@/components/Accordion'
import BankTransferForm from '@/components/Form/BankTransferForm'

export default function BankTransferPaymentMethod() {
  return (
    <Accordion
      stage={3}
      title="Bank Transfer"
      icon={<FaRegMoneyBillAlt size={32} />}
    >
      <p className="mt-2 mb-0 text-sm md:text-md text-center">
        Please select your preferred country and currency pair for payment to
        our bank accounts
      </p>
      <BankTransferForm />
    </Accordion>
  )
}
