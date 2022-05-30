export default function getShippingMethod(invoice: any) {
  const selectedShippingMethod = invoice?.shipment_rating?.services?.filter(
    (shippingData: any) => shippingData?.price === invoice?.shipment_price
  )
  return selectedShippingMethod
}
