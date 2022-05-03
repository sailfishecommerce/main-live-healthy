import PasswordReset from '@/components/AccountRecovery/PasswordReset'
import Applayout from '@/layouts/app-layout'

export default function AccountPasswordRecovery() {
  return (
    <Applayout title="Reset your password">
      <PasswordReset />
    </Applayout>
  )
}
