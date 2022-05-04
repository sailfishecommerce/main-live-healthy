import DashboardSearch from './DashboardSearch'

export default function DashboardMainView() {
  return (
    <div className="bg-gray-100 col-span-4 px-6">
      <DashboardSearch />
      <div className="dashboard-banner mb-12 flex justify-between w-full bg-yellow-100 rounded-xl p-10 my-12">
        <div className="left">
          <h2 className="text-yellow-900 font-bold text-2xl">
            Welcome back !{' '}
          </h2>
          <p className="text-lg">Welcome to Livehealthy stores. 🛒</p>
        </div>
        <div className="right">
          <h2 className="text-2xl font-bold">Good morning, David ☀️</h2>
          <p className="text-lg">
            Here&#39;s the latest activity in your store.
          </p>
        </div>
      </div>
      <div className="orders bg-white rounded-xl px-8 py-6 h-96">
        <h1 className="text-xl font-bold mt-">Orders</h1>
      </div>
    </div>
  )
}
