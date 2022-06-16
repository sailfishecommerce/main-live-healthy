/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid'

import type { cartType } from '@/types'

export function formatIntentData(cart: any, paymentForm: any) {
  const { form } = paymentForm
  const products = formatCartProduct(cart)
  const street = form.address ? form.address : form.district
  const cartData = {
    amount: cart.grandTotal,
    currency: cart.currency,
    merchant_order_id: cart.checkoutId,
    request_id: uuidv4(),
    metadata: {
      shipment_price: cart?.shipmentTotal,
      email: form.email,
      shipment_method: cart.shipmentRating.services.filter(
        (service: any) => service.price === cart.shipmentTotal
      )[0],
    },
    order: {
      products,
      shipping: {
        address: {
          city: form.district,
          country_code: form.country.toUpperCase(),
          state: form.region,
          postcode: form.zip,
          street,
        },
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
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
