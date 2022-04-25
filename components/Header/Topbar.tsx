import dynamic from 'next/dynamic'

import TopbarSlider from '@/components/Slider/TopbarSlider'
import useMediaQuery from '@/hooks/useMediaQuery'

const CurrencyDropdown = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Dropdown/CurrencyDropdown'
    )
)

export default function Topbar() {
  const tabWidth = useMediaQuery('(max-width:768px)')

  return (
    <div className="topbar bg-gray-700 w-full h-20 text-white flex items-center justify-center px-2 tablet:px-0">
      <div className="container flex justify-between items-center">
        <p className="support hidden tablet:flex">Support 00124-567-985</p>
        <TopbarSlider />
        {!tabWidth && <CurrencyDropdown />}
      </div>
    </div>
  )
}
