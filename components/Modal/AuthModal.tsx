import Modal from '@/components/Modal'
import Tabs from '@/components/Tabs'

interface Props {
  show: boolean
  onHide: () => void
}

export default function AuthModal({ show, onHide }: Props) {
  return (
    <Modal modal={show} modalHandler={onHide}>
      <Tabs />
    </Modal>
  )
}
