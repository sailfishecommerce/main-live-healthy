import { BiLogOut } from 'react-icons/bi'

import Modal from '@/components/Modal'
import { useAuth, useMediaQuery } from '@/hooks'
import useGreetuser from '@/hooks/useGreetuser'

interface Props {
  show: boolean
  onHide: () => void
}

export default function LogoutModal({ show, onHide }: Props) {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { name } = useGreetuser()
  const iconSize = mobileWidth ? 16 : 22
  const { useLogout } = useAuth()
  const logout = useLogout()

  function logoutHandler() {
    return logout.mutate()
  }

  return (
    <Modal
      modalHeaderClassName="absolute z-40 -right-5 -top-5"
      modal={show}
      modalHandler={onHide}
    >
      <div className="logoutModal">
        <h1 className="text-center text-xl">
          Thanks for shopping with{' '}
          <span className="mountain-green mx-2">Live Healthy Stores</span>
        </h1>
        <h3 className="my-2">
          Hello <span className="mountain-green font-semibold">{name}</span>,
          are you sure you want to logout?
        </h3>
        <button
          type="button"
          aria-label="logout"
          className="mt-6 flex items-center text-white  px-4 py-1 rounded-xl mx-auto bg-mountain-green"
          onClick={logoutHandler}
        >
          <BiLogOut
            className="lg:mr-2 mr-1 hover:text-green-500"
            size={iconSize}
          />
          Logout
        </button>
      </div>
    </Modal>
  )
}
