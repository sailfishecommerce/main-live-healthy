export function vboutOrderData(cart: any, order: any) {
  const data = {
    cartId: cart.id,
    uniqueId: `${cart.id}-${order.id}`,
    orderId: order.id,
    orderNumber: order.number,
    paymentMethod: order.billing?.card.brand,
    grandTotal: order.grandTotal,
    status: order.status,
    subtotal: order.subtotal,
    customerInfo: {
      firstname: order.account.firstName,
      lastname: order.account.lastName,
      email: order.account.email,
      country: order.billing.country,
    },
    billingInfo: {
      firstname: order.account.firstName,
      lastname: order.account.lastName,
      email: order.account.email,
      address: `${order.billing.address1} ${order.billing.address1}`,
      city: order.billing.city,
      statename: order.billing.state,
      countryname: order.billing.country,
      zipcode: order.billing.zip,
    },
    shippingInfo: {
      firstname: order.account.firstName,
      lastname: order.account.lastName,
      email: order.account.email,
      address: `${order.billing.address1} ${order.billing.address1}`,
      city: order.billing.city,
      statename: order.billing.state,
      countryname: order.billing.country,
      zipcode: order.billing.zip,
    },
  };
  return data;
}
