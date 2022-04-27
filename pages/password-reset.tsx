import PasswordReset from '@/components/AccountRecovery/PasswordReset'
import Pagetitle from '@/components/Header/page-title'

export default function AccountPasswordRecovery() {
  return (
    <>
      <Pagetitle title="Reset your password" />
      <PasswordReset />
    </>
  )
}
