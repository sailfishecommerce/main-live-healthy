/* eslint-disable array-callback-return */

import { formatOrderDate } from '@/lib/formatOrderDate'
import { formatPrice } from '@/lib/formatPrice'

export default function formatInvoice(invoiceArray: any[]) {
  const newOrderArray: any[] = []
  invoiceArray?.map((invoice, index: number) => {
    const isAirwallex = invoice?.latest_payment_attempt?.settle_via
    const airwallexPaymentCheck =
      isAirwallex === 'airwallex' ? invoice.status : ''
    const airwallexPaymentStatus =
      airwallexPaymentCheck === 'SUCCEEDED' ? 'Paid' : 'Unpaid'
    const stripePaymentStatus = invoice.paid ? 'Paid' : 'Unpaid'
    const stripeOrderDelivered = invoice?.delivered
      ? 'Fulfilled'
      : 'Unfulfilled'
    const createdDate =
      isAirwallex === 'airwallex' ? invoice.created_at : invoice.date_created
    const totalAmount =
      isAirwallex === 'airwallex' ? invoice.amount : invoice.payment_total

    newOrderArray[index] = {
      orderNumber: isAirwallex === 'airwallex' ? invoice.id : invoice.number,
      dateCreated: formatOrderDate(createdDate),
      customerName:
        isAirwallex === 'airwallex'
          ? `${invoice.invoice.shipping.first_name} ${invoice.invoice.shipping.last_name}`
          : invoice.billing.name || invoice.shipping.name,
      payment:
        isAirwallex === 'airwallex'
          ? airwallexPaymentStatus
          : stripePaymentStatus,
      orderFulfillment:
        isAirwallex === 'airwallex' ? '-' : stripeOrderDelivered,
      currency: invoice.currency === 'HKD' ? 'HK $' : invoice.currency,
      orderTotal: `${invoice.currency} ${formatPrice(totalAmount)}`,
    }
  })
  return newOrderArray
}
