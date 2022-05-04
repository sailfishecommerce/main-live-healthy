import { useCart } from '@/hooks'
import greetUser from '@/lib/greetUser'

export default function DashboardCard() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()

  return (
    <div className="dashboard-banner mb-12 flex justify-between w-full bg-yellow-100 rounded-xl p-10 my-12">
      <div className="left">
        <h2 className="text-yellow-900 font-bold text-2xl">Welcome back ! </h2>
        <p className="text-lg">Welcome to Livehealthy stores. 🛒</p>
      </div>
      <div className="right">
        <h2 className="text-2xl font-bold">
          {greetUser()}, {cart?.account?.name} ☀️
        </h2>
        <p className="text-lg">Here&#39;s the latest activity in your store.</p>
      </div>
    </div>
  )
}
