/* eslint-disable array-callback-return */

export default function formatTable(orderArray: any[]) {
  const newOrderArray: any[] = []
  orderArray?.map((order, index: number) => {
    const isAirwallex = order?.latest_payment_attempt?.settle_via
    const airwallexPaymentCheck =
      isAirwallex === 'airwallex' ? order.status : ''
    const airwallexPaymentStatus =
      airwallexPaymentCheck === 'SUCCEEDED' ? 'Paid' : 'Unpaid'
    const stripePaymentStatus = order.paid ? 'Paid' : 'Unpaid'
    const stripeOrderDelivered = order?.delivered ? 'Fulfilled' : 'Unfulfilled'

    newOrderArray[index] = {
      orderNumber: isAirwallex === 'airwallex' ? order.id : order.number,
      dateCreated:
        isAirwallex === 'airwallex' ? order.created_at : order.date_created,
      customerName:
        isAirwallex === 'airwallex'
          ? `${order.order.shipping.first_name} ${order.order.shipping.last_name}`
          : order.billing.name || order.shipping.name,
      payment:
        isAirwallex === 'airwallex'
          ? airwallexPaymentStatus
          : stripePaymentStatus,
      orderFulfillment:
        isAirwallex === 'airwallex' ? '-' : stripeOrderDelivered,
      currency: order.currency === 'HKD' ? 'HK $' : order.currency,
      orderTotal:
        isAirwallex === 'airwallex' ? order.amount : order.payment_total,
    }
  })
  return newOrderArray
}
