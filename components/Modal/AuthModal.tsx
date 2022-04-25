import Modal from '@/components/Modal'
import Tabs from '@/components/Tabs'

interface Props {
  show: boolean
  onHide: () => void
}

export default function AuthModal({ show, onHide }: Props) {
  return (
    <Modal
      modalHeaderClassName="absolute z-40 -right-5 -top-5"
      modal={show}
      modalHandler={onHide}
    >
      <Tabs />
    </Modal>
  )
}
