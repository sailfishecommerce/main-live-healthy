import { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { GrLogin } from 'react-icons/gr'

import { useAccount, useMediaQuery } from '@/hooks'
import useUI from '@/hooks/useUI'

export default function AuthIcons() {
  const { toggleAuthModalHandler, toggleLogoutModalHandler }: any = useUI()
  const { getUserAccount } = useAccount()
  const [userDetails, setUserDetails] = useState(null)
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const iconSize = mobileWidth ? 16 : 22

  useEffect(() => {
    getUserAccount()
      .then((response) => setUserDetails(response))
      .catch((err) => setUserDetails(err))
  }, [])

  return (
    <div className="flex items-center">
      {userDetails === null ? (
        <button type="button" title="Login" onClick={toggleAuthModalHandler}>
          <GrLogin
            className="lg:mr-4 mr-0 hover:text-green-500"
            size={iconSize}
          />
        </button>
      ) : (
        <button type="button" title="Logout" onClick={toggleLogoutModalHandler}>
          <BiLogOut
            className="lg:mr-2 mr-0 hover:text-green-500"
            size={iconSize}
          />
        </button>
      )}
    </div>
  )
}
