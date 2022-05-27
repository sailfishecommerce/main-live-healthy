/* eslint-disable array-callback-return */
export default function getInvoiceproductIds(orders: []) {
  const orderIds: string[] = []
  orders.map((order: { items: [] }) => {
    order.items.map((itemOrder: { product_id: string }) => {
      orderIds.push(itemOrder.product_id)
    })
  })

  return orderIds
}
