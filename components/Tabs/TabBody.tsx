import SigninForm from '@/components/Form/SigninForm'
import SignupForm from '@/components/Form/SignupForm'
import Tabpanel from '@/components/Tabs/Tabpanel'

interface Props {
  tab: number
}

export default function TabBody({ tab }: Props) {
  return (
    <div className="tab-content" id="tabs-tabContentFill">
      <div className="auth-tab">
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
      <style jsx>
        {`
          .auth-tab {
            width: 40vw;
          }
        `}
      </style>
    </div>
  )
}
