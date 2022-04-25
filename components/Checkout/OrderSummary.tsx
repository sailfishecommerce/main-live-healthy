import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'

export default function OrderSummary() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  return (
    <div className="rounded-md pt-4 bg-white rounded-md p-4 my-2 h-full">
      <h4 className="font-medium">ORDER SUMMARY</h4>
      <ul>
        {cart?.items.map((item: any) => (
          <li
            key={item.productId}
            className="item border-b py-3 border-gray-100 flex justify-between items-center"
          >
            <div className="font-normal">
              {item.quantity} X{' '}
              <span className="product-name">{item.product.name}</span>
            </div>
            <FormattedPrice price={item?.price} />
          </li>
        ))}
      </ul>
      <div className="subtotal flex items-center justify-between">
        <h6 className="font-bold">Subtotal</h6>
        <FormattedPrice className="text-sm" price={cart?.subTotal} />
      </div>
      <div className="shipping flex items-center justify-between">
        <span className="flex flex-col">
          <h6>
            Shippong to <span className="font-bold">Hong Kong</span>
          </h6>
          <p className="text-gray-500">Express (3-5 business days, tracking)</p>
        </span>
        <h5 className="font-bold">FREE</h5>
      </div>
      <div className="total bg-gray-300 p-4 my-2 justify-between items-center flex">
        <h4 className="font-medium">ORDER TOTAL</h4>
        <FormattedPrice price={cart?.grandTotal} />
      </div>
      <div className="email flex items-center my-1">
        <input type="checkbox" className="mr-2 mt-2 mb-0" />{' '}
        <p className="mb-0">
          Email me about new products, deals and surprise treats
        </p>
      </div>
      <button
        type="button"
        className="w-full p-3 text-xl mt-1 my-3 bg-orange-500 text-white text-center hover:bg-orange-700 font-bold shadow-lg rounded-md"
      >
        COMPLETE ORDER
      </button>
      <p className="text-gray-500 text-sm">
        *By signing up or placing an order, you&#39;re consenting to our privacy
        policy
      </p>
      <style jsx>
        {`
          .font-normal {
            width: 75%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  )
}
