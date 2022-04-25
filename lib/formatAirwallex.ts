import { v4 as uuidv4 } from "uuid";
import { cartType } from "@/types";

export function formatIntentData(cart: any, paymentForm: any) {
  const products = formatCartProduct(cart);
  const street = paymentForm.address1
    ? paymentForm.address1
    : paymentForm.state;
  const cartData = {
    amount: cart.grandTotal,
    currency: cart.currency,
    merchant_order_id: cart.checkoutId,
    request_id: uuidv4(),
    order: {
      products,
      shipping: {
        address: {
          city: paymentForm.city,
          country_code: paymentForm.country.toUpperCase(),
          state: paymentForm.state,
          postcode: paymentForm.zip,
          street,
        },
        first_name: paymentForm.firstName,
        last_name: paymentForm.lastName,
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
  };
  return cartData;
}

function formatCartProduct(cart: cartType) {
  let productArray: any[] = [];
  cart?.items.map((item: any, index: number) => {
    productArray[index] = {
      desc: item.product?.metaTitle,
      name: item.product.name,
      quantity: item.quantity,
      unit_price: item.price,
      url: `https://www.livehealthy.hk/products/${item.product.slug}`,
      sku: item?.product.sku,
    };
  });
  return productArray;
}
