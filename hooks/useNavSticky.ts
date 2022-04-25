import { atom } from 'jotai'

export default function useNavSticky() {
  const isStickyAtom = atom<boolean>(false)
  return isStickyAtom
}
