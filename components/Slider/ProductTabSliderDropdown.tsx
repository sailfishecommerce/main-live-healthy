import { useAtom } from 'jotai'

import ProductTabDropdown from '@/components/Dropdown/ProductTabDropdown'
import { useMediaQuery } from '@/hooks'
import { productRatingAtom } from '@/lib/atomConfig'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ProductTabSliderDropdown() {
  const [productRating, setProductRating] = useAtom(productRatingAtom)

  const tabWidth = useMediaQuery('(max-width:768px)')
  const tabs = [
    { name: 'New Products', value: 3 },
    { name: 'Special Products', value: 4 },
    { name: 'Featured Products', value: 5 },
  ]

  function updateProductRatingHandler(tabValue: number) {
    setProductRating(tabValue)
  }

  return (
    <>
      {tabWidth ? (
        <ProductTabDropdown
          dropdown={tabs}
          onClick={updateProductRatingHandler}
        />
      ) : (
        <div className="tabs flex items-center mb-6">
          {tabs.map((tab) => {
            const activeTab =
              tab.value === productRating ? 'text-black' : 'text-gray-500'
            return (
              <button
                type="button"
                key={tab.value}
                className={`${activeTab} text-xs md:text-xl lg:text-2xl font-bold mr-8`}
                onClick={() => updateProductRatingHandler(tab.value)}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
