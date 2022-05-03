import AccountSigninForm from '@/components/Form/AccountSigninForm'
import AccountSignupForm from '@/components/Form/AccountSignupForm'
import Applayout from '@/layouts/app-layout'

export default function MyAccountPage() {
  return (
    <Applayout title="Signup | Sign in">
      <div className="container py-4 py-lg-5 my-4">
        <div className="row">
          <AccountSigninForm />
          <AccountSignupForm />
        </div>
      </div>
    </Applayout>
  )
}
