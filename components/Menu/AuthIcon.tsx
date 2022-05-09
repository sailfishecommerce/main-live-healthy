import { useAtom } from 'jotai'
import { BiLogOut } from 'react-icons/bi'
import { GrLogin } from 'react-icons/gr'
import { useQuery } from 'react-query'

import { useAccount, useMediaQuery } from '@/hooks'
// import useUI from '@/hooks/useUI'
import { modalAtom } from '@/lib/atomConfig'

export default function AuthIcons() {
  const [, setModal]: any = useAtom<'SLIDING-CART' | null>(modalAtom)
  // const { toggleAuthModalHandler, toggleLogoutModalHandler }: any = useUI()
  const { getUserAccount } = useAccount()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { data, status } = useQuery('userDetails', getUserAccount)

  const iconSize = mobileWidth ? 16 : 22

  function updateModalView(modalState: 'MODAL_LOGIN' | 'MODAL_LOGOUT') {
    return setModal(modalState)
  }

  return (
    <div className="flex items-center">
      {status === 'success' && data === null ? (
        <button
          type="button"
          title="Login"
          onClick={() => updateModalView('MODAL_LOGIN')}
        >
          <GrLogin
            className="lg:mr-4 mr-0 hover:text-green-500"
            size={iconSize}
          />
        </button>
      ) : (
        <button
          type="button"
          title="Logout"
          onClick={() => updateModalView('MODAL_LOGOUT')}
        >
          <BiLogOut
            className="lg:mr-2 mr-0 hover:text-green-500"
            size={iconSize}
          />
        </button>
      )}
    </div>
  )
}
