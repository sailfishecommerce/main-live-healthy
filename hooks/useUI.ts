import { atom } from 'jotai'

export default function useUI(): any {
  const toggleModal = () => {
    const modalState = atom(false)
    return modalState
  }

  return {
    toggleModal,
  }
}
