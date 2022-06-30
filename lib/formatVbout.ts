import type { addCategoryViewType, createVboutOrderType } from '@/typings/types'

export function formatCreateVboutOrder(item: createVboutOrderType) {
  const data = {
    domain: 'VBT-43304-6887',
    cartid: item.cartId,
    uniqueid: item.uniqueId,
    orderid: item.orderId,
    ordernumber: item.orderNumber,
    paymentmethod: item.paymentMethod,
    grandTotal: item.grandTotal,
    subtotal: item.subtotal,
    currency: 'HKD',
    status: item.status,
    storename: 'livehealthy',
    customerinfo: item.customerInfo,
    billinginfo: item.billingInfo,
    shippinginfo: item.shippingInfo,
  }
  return data
}

export function formatVboutCategoryView(content: addCategoryViewType) {
  const data = {
    domain: 'VBT-43304-6887',
    uniqueid: content.id,
    categoryid: content.categoryId,
    name: content.categoryName,
    link: content.categoryLink,
    image: content.categoryImage,
  }
  return data
}
