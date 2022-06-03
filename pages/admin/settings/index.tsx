import { useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import AdmimAuthForm from '@/components/Form/AdminAuthForm'
import settingsList from '@/json/settings.json'
import DashboardLayout from '@/layouts/dashboard-layout'

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
        <div className="content mt-4 flex h-full">
          <div className="settings w-1/3">
            <h1 className="text-xl font-semibold">Settings</h1>
            <ul>
              {settingsList.map((item) => {
                const activeItem =
                  item.viewId === settingsView ? 'mountain-green' : ''
                return (
                  <li className="text-lg my-2" key={item.viewId}>
                    <button
                      type="button"
                      className={activeItem}
                      onClick={() => onSettingsViewChange(item.viewId)}
                    >
                      {item.text}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="settings-view w-2/3 border-l-2">{switchView()}</div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
