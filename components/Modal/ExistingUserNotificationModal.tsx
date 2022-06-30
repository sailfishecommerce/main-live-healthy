import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import Image from '@/components/Image'
import Modal from '@/components/Modal'
import { modalAtom } from '@/lib/atomConfig'
import type { modalType } from '@/typings/atomtype'

export default function ExistingUserNotificationModal({
  show,
  onHide,
  data,
}: any) {
  const router = useRouter()
  const [, setModal]: any = useAtom<modalType>(modalAtom)

  function forgotPassword() {
    onHide()
    router.push('/account-password-recovery')
  }

  function loginHandler() {
    onHide()
    setModal('MODAL_LOGIN')
  }

  return (
    <Modal
      modal={show}
      modalHandler={onHide}
      title="A user exist with this email"
    >
      <div className="flex items-center mx-auto justify-center mb-1">
        <h6 className="text-center mb-0 me-1">
          Hello, thanks for shopping with us
        </h6>
        <Image
          src="/shopping-bag.png"
          alt="shopping bag"
          height={40}
          width={40}
          loading="lazy"
        />
      </div>
      <h6 className="text-center">
        A user with the email address{' '}
        <span className="text-decoration-underline font-bold">{data} </span>{' '}
        already exist
      </h6>
      <p className="text-center">
        Please
        <a
          aria-label="login"
          className="btn-link font-bold text-decoration-underline ms-1 me-1 cursor-pointer"
          href="#login"
          onClick={loginHandler}
        >
          login
        </a>
        with this email to continue with your payment
      </p>
      <p className="text-center">
        <a
          aria-label="forgot password"
          href="#forgot-password"
          className="btn-link font-bold text-decoration-underline cursor-pointer"
          onClick={forgotPassword}
        >
          Forgot password ?
        </a>
      </p>
    </Modal>
  )
}
