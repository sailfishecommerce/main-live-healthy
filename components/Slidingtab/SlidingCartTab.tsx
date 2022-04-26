import SlideCardTotal from '@/components/Cards/SlideCardTotal'
import ProductRow from '@/components/Product/ProductRow'
import RecommendationSlider from '@/components/Slider/RecommendationSlider'
import SlidingTab from '@/components/Slidingtab'
import { useCart } from '@/hooks'

export default function SlidingCartTab() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  return (
    <>
      <SlidingTab>
        <div className="cart-content bg-white w-full flex flex-col h-full p-6">
          <div className="slide-items flex flex-col">
            <div className="cart flex items-center">
              <h3 className="text-xl font-medium">Cart </h3>
              <span className="rounded-full text-xs ml-1 -mt-4 px-2 text-white bg-tan-hide">
                {cart?.items?.length}
              </span>
            </div>
            <div className="content mb-4">
              {cart?.items.map((cartItem: any) => (
                <ProductRow key={cartItem.id} cart={cartItem} />
              ))}
            </div>
            <RecommendationSlider />
          </div>
          <div className="cart-total">
            <SlideCardTotal />
          </div>
        </div>

        <style jsx>
          {`
            .cart-content {
              height: 100vh;
            }
            .slider {
              max-height: 40vh;
              position: absolute;
              left: 0;
              bottom: 0;
            }
            .slide-items {
              height: 60vh;
              position: relative;
              overflow-y: scroll;
            }

            .cart-total {
              height: 40vh;
            }

            @media (max-width: 768px) {
              .slide-items {
                height: 65vh;
              }
            }
          `}
        </style>
      </SlidingTab>
    </>
  )
}
