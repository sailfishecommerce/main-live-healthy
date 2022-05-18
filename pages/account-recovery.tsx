import Image from 'next/image'

import AccountRecoveryform from '@/components/Form/AccountRecoveryForm'
import passwordResetForm from '@/json/password-reset.json'
import Applayout from '@/layouts/app-layout'

export default function AccountPasswordRecovery() {
  return (
    <Applayout title="Recover your password with ease">
      <div className="container flex flex-col lg:flex-row  py-4 my-4 mx-auto">
        <div className="content w-full flex mx-auto justify-center bg-gray-100 p-12 lg:w-1/2">
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
        <div className="lg:w-1/2 w-full">
          <Image
            src="/forgotPassword.webp"
            alt="account-recovery"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Applayout>
  )
}
