import SlideCardTotal from '@/components/Cards/SlideCardTotal'
import ProductRow from '@/components/Product/ProductRow'
import RecommendationSlider from '@/components/Slider/RecommendationSlider'
import SlidingTab from '@/components/Slidingtab'
import { useCart } from '@/hooks'

export default function SlidingCartTab() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  return (
    <SlidingTab>
      <div className="cart bg-white w-full h-full p-6">
        <h3 className="text-xl font-medium flex items-center">
          Cart{' '}
          <span className="rounded-full text-xs ml-1 -mt-4 px-2 text-white bg-tan-hide">
            {cart?.items?.length}
          </span>
        </h3>
        <div className="content mb-4">
          {cart?.items.map((cartItem: any) => (
            <ProductRow key={cartItem.id} cart={cartItem} />
          ))}
        </div>
        <RecommendationSlider />
        <SlideCardTotal />
        <style jsx>
          {`
            .content {
              max-height: 400px;
            }
          `}
        </style>
      </div>
    </SlidingTab>
  )
}
