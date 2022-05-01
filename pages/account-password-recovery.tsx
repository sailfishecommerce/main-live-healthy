import dynamic from 'next/dynamic'
import Image from 'next/image'

import Pagetitle from '@/components/Header/page-title'
import passwordResetForm from '@/json/password-reset.json'

const AccountRecoveryform = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AccountRecoveryForm' */ '@/components/Form/AccountRecoveryForm'
    )
)

export default function AccountPasswordRecovery() {
  return (
    <>
      <Pagetitle title="Recover your password with ease" />
      <div className="container flex py-4 py-lg-5 my-4 mx-auto">
        <div className="content flex mx-auto justify-center bg-gray-100 p-12 w-1/2">
          <div className="flex mx-auto justify-center flex-col">
            <h2 className="h3 mb-2 text-xl font-bold">Forgot your password?</h2>
            <p className="my-2">
              Change your password in three easy steps. This helps to keep your
              new password secure.
            </p>
            <ol className="list-unstyled fs-md">
              {passwordResetForm.listView.map((list) => (
                <li key={list.text}>
                  <span className="text-primary mx-2">{list.count}.</span>
                  {list.text}
                </li>
              ))}
            </ol>
            <AccountRecoveryform />
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src="/forgotPassword.webp"
            alt="account-recovery"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  )
}
