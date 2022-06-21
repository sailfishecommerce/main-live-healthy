import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function ContactusPage() {
  return (
    <DashboardLayout title="About us page">
      <DashboardMainView>
        <h4 className="text-xl font-bold text-center">
          ✍🏻 Edit Contact us page content
        </h4>
        <div className="content grid grid-cols-2 mt-12">
          <div className="main-address mb-4">
            <h6 className="text-lg font-semibold">🏢 Main Store Address </h6>
            <div className="address">
              <p>Live Healthy HK</p>
              <p>10/F, Cheung Hing Industrial Building</p>
              <p>12P Smithfield, Kennedy Town</p>
              <p>Hong Kong Island, Hong Kong.</p>
            </div>
          </div>
          <div className="Working hours mb-4">
            <h6 className="text-lg font-semibold">⏰ Working hours</h6>
            <div className="address">
              <p>Mon-Fri: 10AM - 7PM</p>
              <p>Saturday: 11AM - 5PM</p>
            </div>
          </div>
          <div className="Phone numbers">
            <h6 className="text-lg font-semibold">📞 Phone numbers</h6>
            <ul className="address">
              <li className="flex items-center">
                <span className="mr-2 font-semibold">For Customers</span>
                <p>+85370735292</p>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold">For Emergency</span>
                <p>+85370735292</p>
              </li>
            </ul>
          </div>
          <div className="Email Address">
            <h6 className="text-lg font-semibold">📧 Emails</h6>
            <ul className="address-list">
              <li className="flex items-center">
                <span className="mr-2 font-semibold">For Customers</span>
                <p>care@livehealthy.com.hk</p>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold">For vacancy</span>
                <p>vacancy@livehealthy.com.hk</p>
              </li>
            </ul>
          </div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
