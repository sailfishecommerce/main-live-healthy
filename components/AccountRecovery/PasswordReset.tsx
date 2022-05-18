import dynamic from 'next/dynamic'
import Image from 'next/image'

const PasswordResetForm = dynamic(
  (): any =>
    import(
      /* webpackChunkName: 'PasswordResetForm' */ '@/components/Form/PasswordResetForm'
    ),
  {
    ssr: false,
  }
)

export default function PasswordReset() {
  return (
    <div className="container flex flex-col lg:flex-row items-center mx-auto py-4 py-lg-5 my-4">
      <div className="row lg:w-1/2 w-full justify-center">
        <div className="text-content">
          <h2 className="h3 mb-4">Forgot your password?</h2>
          <p className="fs-md">
            Reset your password, ensure to fill details appropriately
          </p>
          <div className="card py-2 mt-4">
            <PasswordResetForm />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full image-wrapper">
        <Image
          src="/forgotPassword.webp"
          alt="forgot password"
          height={500}
          width={700}
        />
      </div>
    </div>
  )
}
