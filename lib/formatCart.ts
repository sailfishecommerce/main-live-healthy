import {
  updateStoreCartCurrency,
  updateStoreCartItem,
} from "@/redux/store-cart-slice";

export default function formatCartItem(
  product: any,
  currency: string,
  quantity: number
) {
  const cartItem = {
    product_id: product.id,
    price: product.price,
    quantity,
    metadata: {
      name: product.name,
      images: product.images,
      product_type: product.product_type,
      slug: product.slug,
      vendor: product.vendor,
    },
  };
  return cartItem;
}

export function dispatchCartItem(
  product: any,
  currency: string,
  dispatch: any
) {
  const cartItem = formatCartItem(product, currency, 1);
  dispatch(updateStoreCartItem(cartItem));
  dispatch(updateStoreCartCurrency(currency));
}

export function updateCart() {
  return "";
}
