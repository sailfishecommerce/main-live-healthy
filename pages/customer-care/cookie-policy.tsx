import CustomerCareSidebar from '@/components/Sidebar/CustomerCareSidebar'
import Applayout from '@/layouts/app-layout'

export default function CookiePolicy() {
  return (
    <Applayout title="Our Cookie Policy">
      <div className="content">
        <div className="banner w-full bg-mountain-green h-52 flex flex-col items-center justify-center">
          <h1 className="text-center mb-5 font-bold text-xl text-white">
            Welcome to Our Customer Care{' '}
          </h1>
          <h4 className="text-center text-2xl">NEED HELP?</h4>
        </div>
        <main className="container py-4">
          <CustomerCareSidebar />
          <div className="w-3/4 bg-gray-100"></div>
        </main>
      </div>
    </Applayout>
  )
}
