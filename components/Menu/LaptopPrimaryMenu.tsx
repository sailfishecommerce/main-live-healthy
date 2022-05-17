import MenuIcons from '@/components/Menu/MenuIcons'
import MenuLinks from '@/components/Menu/MenuLinks'

export default function LaptopPrimaryMenu() {
  return (
    <div className="flex w-4/6 lg:w-3/4 xl:w-4/6 justify-between">
      <MenuLinks />
      <MenuIcons />
    </div>
  )
}
