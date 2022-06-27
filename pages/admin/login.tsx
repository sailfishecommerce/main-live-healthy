import Image from 'next/image'

import AdminAuthForm from '@/components/Form/AdminAuthForm'
import Logo from '@/components/Logo'
import DefaultLayout from '@/layouts/default-layout'

export default function AdminLoginPage() {
  return (
    <DefaultLayout>
      <div className="w-full h-full flex login-page">
        <div className="image-container w-full lg:w-4/5 h-full">
          <Image
            src="/e-commerce-banner.webp"
            alt="image-banner"
            layout="responsive"
            height={650}
            width={1000}
          />
        </div>
        <div className="login-card w-full lg:w-1/3 py-8 px-4 bg-white">
          <span></span>
          <Logo className="mx-auto flex items-center justify-center my-12" />
          <h1 className="text-center font-bold text-lg">
            🎉 Welcome to Livehealthy store Admin, Please Login
          </h1>
          <AdminAuthForm type="signin" />
        </div>
      </div>
      <style jsx>
        {`
          .login {
            height: 100vh;
            background-color: gray;
          }
          .image-container {
            height: 100%;
          }
          .login-card {
            background-color: lightgray;
            height: 100vh;
          }
        `}
      </style>
    </DefaultLayout>
  )
}
