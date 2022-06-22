import { useState } from 'react'
import ContentEditable from 'react-contenteditable'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import content from '@/json/contact-content.json'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function ContactusPage() {
  const [contactusState, setContactusState] = useState(content)
  return (
    <DashboardLayout title="About us page">
      <DashboardMainView>
        <h4 className="text-xl font-bold text-center">
          ✍🏻 Edit Contact us page content
        </h4>
        <p></p>
        <div className="content grid grid-cols-2 mt-12">
          <div className="main-address mb-4">
            <h6 className="text-lg font-semibold">🏢 Main Store Address </h6>
            <div className="address">
              <ContentEditable
                html={contactusState.mainStore}
                onChange={() => null}
              />
            </div>
          </div>
          <div className="Working hours mb-4">
            <h6 className="text-lg font-semibold">⏰ Working hours</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.workingHours}
                onChange={() => null}
              />
            </div>
          </div>
          <div className="Phone numbers">
            <h6 className="text-lg font-semibold">📞 Phone numbers</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.phoneNumbers}
                onChange={() => null}
              />
            </div>
          </div>
          <div className="Email Address">
            <h6 className="text-lg font-semibold">📧 Emails</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.emails}
                onChange={() => null}
              />
            </div>
          </div>
          <style jsx>{`
            .address {
              width: 60%;
            }
          `}</style>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
