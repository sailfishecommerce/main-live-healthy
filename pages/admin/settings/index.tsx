import { useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import AdmimAuthForm from '@/components/Form/AdmimAuthForm'
import DashboardLayout from '@/layouts/dashboard-layout'

const settingsList = [
  {
    text: 'Create a new admin profile',
    viewId: 'create-admin-profile',
  },
  {
    text: 'List of Admins',
    viewId: 'list-of-admin',
  },
  {
    text: 'Change Site Color Code',
    viewId: 'change-site-color-code',
  },
  {
    text: 'Change Site Logo',
    viewId: 'change-site-logo',
  },
]

export default function SettingsPage() {
  const [settingsView, setSettingsView] = useState('create-admin-profile')

  function onSettingsViewChange(viewId: string) {
    setSettingsView(viewId)
  }

  function switchView() {
    switch (settingsView) {
      case 'create-admin-profile': {
        return (
          <div>
            <h2 className="text-center -mb-4 mt-4 font-bold text-lg">
              Sign up to create new Admin profile
            </h2>
            <AdmimAuthForm type="signup" />
          </div>
        )
      }
      default:
        return null
    }
  }
  return (
    <DashboardLayout title="Settings">
      <DashboardMainView>
        <div className="content mt-4 flex flex-column h-full">
          <div className="settings w-1/3">
            <h1 className="text-xl font-semibold">Settings</h1>
            <ul>
              {settingsList.map((item) => (
                <li className="text-lg my-2" key={item.viewId}>
                  <button
                    type="button"
                    onClick={() => onSettingsViewChange(item.viewId)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="settings-view w-2/3 border-l-2">{switchView()}</div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
