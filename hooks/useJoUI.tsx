import { atom, useAtom } from 'jotai'

const displayModal = atom(null)

export default function useJoUI() {
  function useAuthUI() {
    const [modal, setModal] = useAtom(displayModal)
  }

  return {
    useAuthUI,
  }
}
