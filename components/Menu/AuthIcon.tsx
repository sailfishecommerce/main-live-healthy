import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'
import { BiLogOut } from 'react-icons/bi'
import { GrLogin } from 'react-icons/gr'
import { useQuery } from 'react-query'

import { useAccount, useMediaQuery } from '@/hooks'
import { modalAtom } from '@/lib/atomConfig'
import type { modalType } from '@/lib/atomConfigType'

export default function AuthIcons() {
  const [modal, setModal]: any = useAtom<modalType>(modalAtom)
  const { getUserAccount } = useAccount()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { data, status } = useQuery('userDetails', getUserAccount)

  const iconSize = mobileWidth ? 16 : 22

  function updateModalView(modalState: modalType) {
    return setModal(modalState)
  }

  if (modal === null) {
    enableBodyScroll(document.body)
  } else {
    disableBodyScroll(document.body)
  }

  return (
    <div className="flex items-center">
      {status === 'success' && data === null ? (
        <button
          type="button"
          title="Login"
          aria-label="Login"
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
          aria-label="Logut"
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
