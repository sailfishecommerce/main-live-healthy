import ProductTabDropdown from '@/components/Dropdown/ProductTabDropdown'
import { useMediaQuery } from '@/hooks'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ProductTabSliderDropdown() {
  const tabWidth = useMediaQuery('(max-width:768px)')
  const tabs = ['New Products', 'Special Products', 'Featured Products']

  return (
    <>
      {tabWidth ? (
        <ProductTabDropdown />
      ) : (
        <div className="tabs flex items-center mb-6">
          {tabs.map((tab, index) => {
            const activeTab = index === 0 ? 'text-black' : 'text-gray-500'
            return (
              <h4
                key={tab}
                className={`${activeTab} text-xs md:text-xl lg:text-2xl font-bold mr-8`}
              >
                {tab}
              </h4>
            )
          })}
        </div>
      )}
    </>
  )
}
