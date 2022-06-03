import { useAtom } from 'jotai'

import useAuthMutation from '@/hooks/useAuthMutation'
import { adminAuthAtom } from '@/lib/atomConfig'
import getAdminDisplayname from '@/lib/getDisplayName'

export default function DashboardProfile() {
  const [adminAuth] = useAtom(adminAuthAtom)
  const displayName = getAdminDisplayname(adminAuth?.providerData[0])
  const { useAdminLogout } = useAuthMutation()
  const logoutAdmin = useAdminLogout()
  return (
    <div className="px-6 pt-8 flex flex-col w-full items-center relative">
      <h4 className="text-xl font-bold">Profile</h4>
      <div className="profile-icon bg-mountain-green text-white h-20 w-20 mt-4 rounded-full flex items-center justify-center text-2xl">
        {displayName?.toLocaleUpperCase()}
      </div>
      <p className="text-sm">
        Hello, <span className="mountain-green">{adminAuth?.email}</span>
      </p>
      <button
        className="bg-red-500 text-white p-2 float-end flex rounded-md fixed bottom-10 px-4 hover:bg-red-600 text-md"
        type="button"
        onClick={() => logoutAdmin.mutate()}
      >
        Log out
      </button>
    </div>
  )
}
