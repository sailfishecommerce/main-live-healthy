import useCart from '@/hooks/useCart'
import useVboutCommerce from '@/hooks/useVboutCommerce'
import getCountry from '@/lib/getCountry'

type formDataType = {
  email: string
  country: string
  firstName: string
  lastName: string
  phone: string
}

export default function useVboutAction() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const { createVboutCart, addVboutCartItem } = useVboutCommerce()

  function createVboutCartAction(data: formDataType) {
    const country = getCountry(data.country)

    createVboutCart({
      customer: data.email,
      uniqueid: cart.checkoutId,
      cartid: cart.id,
      cartcurrency: 'HKD',
      storename: 'livehealthy store',
      customerinfo: {
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        country,
      },
    })
    // .then((response) => console.log('createVboutCart-response', response))
    // .catch((err) => console.log('error-createVboutCart', err))
  }

  function addCartItemAction(data: formDataType) {
    cart.items.map(
      (cartItem: any) =>
        addVboutCartItem({
          customer: data.email,
          cartid: cart.id,
          productid: cartItem.product.id,
          name: cartItem.product.name,
          price: cartItem.product.salePrice,
          quantity: cartItem.quantity,
          image: cartItem.product.images[0].file.url,
        })
      // .then((response) => console.log('addCartItemAction-response', response))
      // .catch((err) => console.log('error-addCartItemAction', err))
    )
  }

  return { createVboutCartAction, addCartItemAction }
}
