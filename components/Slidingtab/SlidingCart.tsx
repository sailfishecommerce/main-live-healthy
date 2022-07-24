import EmptyCart from '@/components/Checkout/EmptyCart'
import ProductRow from '@/components/Product/ProductRow'
import CartTotal from '@/components/Slidecart/CartTotal'
import RecommendationSlider from '@/components/Slider/RecommendationSlider'
import SlidingTab from '@/components/Slidingtab'
import { useCart } from '@/hooks'

export default function SlidingCart() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()

  const withDiscount = cart && cart?.discountTotal > 0 ? 'withDiscount' : ''

  return (
    <>
      <SlidingTab>
        <div className="cart-content bg-white w-full flex flex-col h-full p-4">
          <div className={`slide-items flex flex-col ${withDiscount}`}>
            <div className="cart flex items-center pt-1">
              <h3 className="text-xl font-medium">Cart </h3>
              {cart !== null && (
                <span className="rounded-full text-xs ml-1 -mt-4 h-5 w-5 flex items-center justify-center text-white bg-tan-hide">
                  {cart?.items?.length}
                </span>
              )}
            </div>
            <div className="content product-row  mb-4">
              {cart?.items.map((cartItem: any) => (
                <ProductRow key={cartItem.id} cart={cartItem} />
              ))}
            </div>
            <div className="slider">
              {cart?.items.length > 0 ? (
                <RecommendationSlider cartItems={cart?.items} />
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>
          <div className={`cart-total ${withDiscount}`}>
            <CartTotal />
          </div>
        </div>

        <style jsx>
          {`
            .cart-content {
              height: 100vh;
            }
            .slider {
              max-height: 28vh;
            }
            .slide-items.withDiscount {
              height: 58vh;
              overflow-y: scroll;
            }
            .cart-total.withDiscount {
              height: 42vh;
            }
            .cart-total {
              height: 30vh;
            }
            .slide-items {
              height: 70vh;
              position: relative;
              overflow-y: scroll;
            }

            @media (max-width: 768px) {
              .slide-items.withDiscount {
                height: 60vh;
                overflow-y: scroll;
              }
              .cart-total.withDiscount {
                height: 35vh;
              }
            }
          `}
        </style>
      </SlidingTab>
    </>
  )
}
