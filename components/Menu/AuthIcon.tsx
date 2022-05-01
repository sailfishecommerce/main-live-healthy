import { BiLogOut } from 'react-icons/bi'
import { GrLogin } from 'react-icons/gr'
import { useQuery } from 'react-query'

import { useAccount, useMediaQuery } from '@/hooks'
import useUI from '@/hooks/useUI'

export default function AuthIcons() {
  const { toggleAuthModalHandler, toggleLogoutModalHandler }: any = useUI()
  const { getUserAccount } = useAccount()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { data, status } = useQuery('userDetails', getUserAccount)

  const iconSize = mobileWidth ? 16 : 22

  return (
    <div className="flex items-center">
      {status === 'success' && data === null ? (
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
