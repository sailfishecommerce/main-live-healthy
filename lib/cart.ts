import swell from "swell-js";

export async function getCart() {
  return await swell.cart.get();
}

export async function listCurrencies() {
  return await swell.currency.list();
}

export async function listProducts() {
  return await swell.products.list({
    limit: 1, // Max. 100
    page: 10,
  });
}

export async function emptyCart() {
  return await swell.cart.setItems([]);
}
