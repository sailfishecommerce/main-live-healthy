import Image from 'next/image'
import React from 'react'

import AdminLogin from '@/components/Form/AdminLogin'

export default function login() {
  return (
    <>
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
        <div className="login-card w-full lg:w-1/5 py-8 px-4 bg-white">
          <h1 className="text-center font-bold text-lg">
            🎉 Welcome to Livehealthy store Admin, Please Login
          </h1>
          <AdminLogin />
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
          }
        `}
      </style>
    </>
  )
}
