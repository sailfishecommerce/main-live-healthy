import SigninForm from '@/components/Form/SigninForm'
import SignupForm from '@/components/Form/SignupForm'
import Tabpanel from '@/components/Tabs/Tabpanel'
// import SocialAuthIcons from '@/components/Icons/SocialAuthIcons'

interface Props {
  tab: number
}

export default function TabBody({ tab }: Props) {
  return (
    <>
      <div className="tab-content" id="tabs-tabContentFill">
        <div className="auth-tab mx-auto">
          {tab === 0 && (
            <Tabpanel id="signin">
              <SigninForm />
            </Tabpanel>
          )}
          {tab === 1 && (
            <Tabpanel id="signup">
              <SignupForm />
            </Tabpanel>
          )}
        </div>
        {/* <div className="social-login my-2 mt-4">
          <div className="text-center text-sm font-bold">OR LOGIN WITH</div>
          <SocialAuthIcons />
        </div> */}
        <style jsx>
          {`
            .auth-tab {
              width: 40vw;
            }
            @media (max-width: 768px) {
              .auth-tab {
                width: 100%;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
