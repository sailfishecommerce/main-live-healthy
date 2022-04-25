import { addCategoryViewType, createVboutOrderType } from "@/types";

export function formatCreateVboutOrder(item: createVboutOrderType) {
  const data = {
    domain: "VBT-88360-6048",
    cartid: item.cartId,
    uniqueid: item.uniqueId,
    orderid: item.orderId,
    ordernumber: item.orderNumber,
    paymentmethod: item.paymentMethod,
    grandTotal: item.grandTotal,
    subtotal: item.subtotal,
    currency: "USD",
    status: item.status,
    storename: "livehealthy",
    customerinfo: item.customerInfo,
    billinginfo: item.billingInfo,
    shippinginfo: item.shippingInfo,
  };
  return data;
}

export function formatVboutCategoryView(content: addCategoryViewType) {
  const data = {
    domain: "VBT-88360-6048",
    uniqueid: content.id,
    categoryid: content.categoryId,
    name: content.categoryName,
    link: content.categoryLink,
    image: content.categoryImage,
  };
  return data;
}
