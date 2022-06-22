import { useState, useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import { AiFillSave } from 'react-icons/ai'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import { useToast } from '@/hooks'
import content from '@/json/contact-content.json'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'

export default function ContactusPage() {
  const [contactusState, setContactusState] = useState(content)
  const { loadingToast, updateToast } = useToast()

  const toastID = useRef(null)

  function saveChange() {
    loadingToast(toastID)
    const { writeData } = firebaseDatabase()
    writeData('articles/team/contact-us/content', contactusState)
      .then(() => updateToast(toastID, 'success', 'changes saved'))
      .catch(() => updateToast(toastID, 'error', 'an error occured, try again'))
  }

  function handleChange(evt: any, stateKey: string) {
    setContactusState({
      ...contactusState,
      [`${stateKey}`]: evt.target.value,
    })
  }
  return (
    <DashboardLayout title="About us page">
      <DashboardMainView>
        <h4 className="text-xl font-bold text-center">
          ✍🏻 Edit Contact us page content
        </h4>
        <p className="text-lg text-center mt-2 font-thin">
          Click on the text to edit content
        </p>
        <div className="content grid grid-cols-2 mt-12">
          <div className="main-address mb-4">
            <h6 className="text-lg font-semibold">🏢 Main Store Address </h6>
            <div className="address">
              <ContentEditable
                html={contactusState.mainStore}
                onChange={(e) => handleChange(e, 'mainStore')}
              />
            </div>
          </div>
          <div className="Working hours mb-4">
            <h6 className="text-lg font-semibold">⏰ Working hours</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.workingHours}
                onChange={(e) => handleChange(e, 'workingHours')}
              />
            </div>
          </div>
          <div className="Phone numbers">
            <h6 className="text-lg font-semibold">📞 Phone numbers</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.phoneNumbers}
                onChange={(e) => handleChange(e, 'phoneNumbers')}
              />
            </div>
          </div>
          <div className="Email Address">
            <h6 className="text-lg font-semibold">📧 Emails</h6>
            <div className="address">
              <ContentEditable
                html={contactusState.emails}
                onChange={(e) => handleChange(e, 'emails')}
              />
            </div>
          </div>
          <button
            type="button"
            className="bg-mountain-green text-white saveChanges"
            onClick={saveChange}
          >
            <AiFillSave className="mr-2" size={20} /> Save Changes
          </button>
          <style jsx>{`
            .address {
              width: 60%;
            }
            .saveChanges {
              width: 150px;
              height: 40px;
              margin-top: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
