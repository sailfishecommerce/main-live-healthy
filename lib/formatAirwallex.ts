/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid'

import type { cartType } from '@/typings/types'

export function formatIntentData(cart: any, paymentForm: any) {
  const shippingServices = cart.shipmentRating.services.filter(
    (service: any) => service.price === cart.shipmentTotal
  )[0]
  const { shipping, billing } = paymentForm
  const products = formatCartProduct(cart)
  const street = shipping?.address1 ? shipping.address1 : shipping.city
  const cartData = {
    amount: cart.grandTotal,
    currency: cart.currency,
    merchant_order_id: cart.checkoutId,
    request_id: uuidv4(),
    descriptor: 'Paid Live healthy stores',
    metadata: {
      shipment_price: cart?.shipmentTotal,
      shipment_name: shippingServices?.name,
      shipment_id: shippingServices?.id,
      shipment_description: shippingServices?.description,
      address1: billing?.address1,
      city: billing.city,
      state: billing.state,
      zip: billing.zip,
      country: billing.country,
      phone: billing.phone,
    },
    order: {
      products,
      shipping: {
        address: {
          city: shipping.city,
          country_code: shipping.country.toUpperCase(),
          state: shipping.state,
          postcode: shipping.zip,
          street,
        },
        first_name: shipping.firstName,
        last_name: shipping.lastName,
        phone_number: shipping.phone,
        shipment_method: cart.shipmentRating.services.filter(
          (service: any) => service.price === cart.shipmentTotal
        )[0],
      },
    },
    payment_method_options: {
      card: {
        risk_control: {
          skip_risk_processing: false,
          three_domain_secure_action: 'FORCE_3DS',
          three_ds_action: 'FORCE_3DS',
        },
        three_ds_action: 'FORCE_3DS',
      },
    },
  }
  return cartData
}

function formatCartProduct(cart: cartType) {
  const productArray: any[] = []
  cart?.items.map((item: any, index: number) => {
    productArray[index] = {
      desc: item.product?.metaTitle,
      name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      url:
        typeof item.product?.images[0] === 'string'
          ? item.product?.images[0]
          : item.product?.images[0].file.url,
      sku: item?.product.sku,
    }
  })
  return productArray
}
