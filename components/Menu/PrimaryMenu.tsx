import Logo from '@/components/Logo'
import MenuLinks from '@/components/Menu/MenuLinks'
import MobilePrimaryMenu from '@/components/Menu/MobilePrimaryMenu'
import { useCart, useMediaQuery } from '@/hooks'

export default function PrimaryMenu() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  return (
    <div className="flex justify-between items-center md:my-2 md:py-4">
      <Logo className="w-1/3 lg:w-44" />
      {mobileWidth ? (
        <MobilePrimaryMenu cart={cart} />
      ) : (
        <MenuLinks cart={cart} />
      )}
    </div>
  )
}
