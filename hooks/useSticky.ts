import { useAtom } from 'jotai'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import useNavSticky from '@/hooks/useNavSticky'

export default function useSticky() {
  const isStickyAtom = useNavSticky()

  const [isSticky, setIsSticky] = useAtom(isStickyAtom)

  const { setObservedNode } = useIntersectionObserver({
    callback: (e) => setIsSticky(e.intersectionRatio < 1),
    threshold: [1],
  })

  return { isSticky, setObservedNode, isStickyAtom }
}
