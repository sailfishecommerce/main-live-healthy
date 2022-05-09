import { useCart } from '@/hooks'
import greetUser from '@/lib/greetUser'

export default function GreetUser() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()

  return (
    <div className="cart mountain-green font-bold text-xs">
      {cart?.accountLoggedIn !== null ? (
        <p className="text-xs md:text-sm text-right">
          {greetUser()}, {cart?.account?.name}{' '}
        </p>
      ) : (
        <p className="text-xs md:text-sm text-right">{greetUser()}, Guest</p>
      )}
    </div>
  )
}
