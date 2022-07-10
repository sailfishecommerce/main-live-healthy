import { useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import { AiFillSave } from 'react-icons/ai'

import { useToast } from '@/hooks'
import firebaseDatabase from '@/lib/firebaseDatabase'

interface Props {
  contactusState: {
    mainStore: string
    workingHours: string
    phoneNumbers: string
    emails: string
  }
  handleChange: (e: any, editType: string) => void
}

export default function AdminContactusView({
  contactusState,
  handleChange,
}: Props) {
  const { loadingToast, updateToast } = useToast()

  const dbRef = 'articles/team/contact-us/content'
  const toastID = useRef(null)

  function saveChange() {
    loadingToast(toastID)
    const { writeData } = firebaseDatabase()
    writeData(dbRef, contactusState)
      .then(() => updateToast(toastID, 'success', 'changes saved'))
      .catch(() => updateToast(toastID, 'error', 'an error occured, try again'))
  }

  return (
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
  )
}
