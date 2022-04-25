import axios from "axios";
import {
  addCategoryViewType,
  addProductSearchType,
  createVboutOrderType,
} from "@/types";
import {
  formatCreateVboutOrder,
  formatVboutCategoryView,
} from "@/lib/formatVbout";

export function addNewUserToList(email: string) {
  const data: any = {
    email,
    status: "active",
    listid: 55592,
  };

  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  );
}

type removeVboutCartType = {
  cartId: string;
  productId: string;
};

export function removeVboutCartItem(item: removeVboutCartType) {
  const data = {
    domain: "VBT-88360-6048",
    cartid: item.cartId,
    productid: item.productId,
  };
  axios.post(
    `https://api.vbout.com/1/ecommerce/removecartitem?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  );
}

export function createVboutOrder(item: createVboutOrderType) {
  const data = formatCreateVboutOrder(item);
  return axios
    .post(
      `https://api.vbout.com/1/ecommerce/createorder?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    )
    .then((response) => console.log("createVboutOrder", response))
    .catch((error) => console.error("error createVboutOrder", error));
}

export function sendBankTransfer(email: string, listid: string) {
  const data = {
    email,
    status: "active",
    listid,
  };
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  );
}

export function addProductSearch(content: addProductSearchType) {
  const data = {
    domain: "VBT-88360-6048",
    uniqueid: content.id,
    customer: content.email,
    query: content.query,
  };
  return axios.post(
    `https://api.vbout.com/1/ecommerce/addproductsearch?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  );
}

export function addCategoryView(content: addCategoryViewType) {
  const data = formatVboutCategoryView(content);
  return axios.post(
    `https://api.vbout.com/1/ecommerce/addcategoryview?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  );
}
