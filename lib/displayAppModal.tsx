/* eslint-disable react/jsx-sort-props */
import AuthModal from '@/components/Modal/AuthModal'
import ExistingUserNotificationModal from '@/components/Modal/ExistingUserNotificationModal'
import type { typeModal } from '@/typings/types'

type modalType = {
  type: typeModal | null
  active: boolean
  data: string | null
}

export default function displayAppModal(modal: modalType, onHide: () => void) {
  switch (modal.type) {
    case 'CHECKOUT_NOTIFICATION_MODAL':
      return (
        <ExistingUserNotificationModal
          show={modal.active}
          onHide={onHide}
          data={modal.data}
        />
      )

    case 'AUTH_MODAL':
      return <AuthModal show={modal.active} onHide={onHide} />

    default:
      return null
  }
}
