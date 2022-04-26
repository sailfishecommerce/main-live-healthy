import { useEffect, useState } from 'react'
import { GrLogin, GrLogout } from 'react-icons/gr'

import { useAccount } from '@/hooks'
import useUI from '@/hooks/useUI'

export default function AuthIcons() {
  const { toggleAuthModalHandler }: any = useUI()
  const { getUserAccount } = useAccount()
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    getUserAccount()
      .then((response) => setUserDetails(response))
      .catch((err) => setUserDetails(err))
  }, [])

  return (
    <div className="flex items-center">
      {userDetails === null ? (
        <button type="button" title="Login" onClick={toggleAuthModalHandler}>
          <GrLogin className="lg:mr-4 mr-0 hover:text-green-500" size={16} />
        </button>
      ) : (
        <button type="button" title="Logout">
          <GrLogout className="lg:mr-2 mr-0 hover:text-green-500" size={16} />
        </button>
      )}
    </div>
  )
}
