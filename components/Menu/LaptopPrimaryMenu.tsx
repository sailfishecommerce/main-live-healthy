import dynamic from 'next/dynamic'

import MenuLinks from '@/components/Menu/MenuLinks'

const DynamicMenuIcons = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicMenuIcons' */ '@/components/Menu/MenuIcons'
    ),
  {
    ssr: false,
  }
)

export default function LaptopPrimaryMenu() {
  return (
    <div className="flex w-4/6 justify-between">
      <MenuLinks />
      <DynamicMenuIcons />
    </div>
  )
}
