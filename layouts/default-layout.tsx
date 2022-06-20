import { useAtom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

import colorCodes from '@/json/color-codes.json'
import { boxColorAtom } from '@/lib/atomConfig'

export default function DefaultLayout({
  children,
}: PropsWithChildren<unknown>) {
  const [boxColor, setBoxColor] = useAtom(boxColorAtom)

  useEffect(() => {
    if (boxColor.length === 0) {
      setBoxColor(colorCodes)
    }
  }, [])

  return <>{children}</>
}
