/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid'

import type { cartType } from '@/types'

export function formatIntentData(cart: any, paymentForm: any) {
  const { form } = paymentForm
  const products = formatCartProduct(cart)
  const street = form.address1 ? form.address1 : form.state
  const cartData = {
    amount: cart.grandTotal,
    currency: cart.currency,
    merchant_order_id: cart.checkoutId,
    request_id: uuidv4(),
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
      },
    },
    payment_method_options: {
      card: {
        risk_control: {
          skip_risk_processing: false,
          three_domain_secure_action: null,
          three_ds_action: null,
        },
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
      unit_price: item.price,
      url: `https://www.livehealthy.hk/products/${item.product.slug}`,
      sku: item?.product.sku,
    }
  })
  return productArray
}
