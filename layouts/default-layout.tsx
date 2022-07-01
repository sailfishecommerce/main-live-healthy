import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'

import Metatag from '@/components/Metatag'
import useColorPicker from '@/hooks/useColorPicker'

export default function DefaultLayout({
  children,
}: PropsWithChildren<unknown>) {
  const { siteColors } = useColorPicker()
  const router = useRouter()

  const siteColorcode: { [key: string]: string } = {}

  siteColors.map((bColor) => {
    const colorKey: string = bColor?.colorKey
    siteColorcode[colorKey] = bColor?.colorCode
    return siteColorcode
  })
  return (
    <>
      {!(
        router?.pathname.includes('collection') ||
        router?.pathname.includes('vendor') ||
        router?.pathname.includes('product')
      ) && <Metatag />}
      {children}
      <style global jsx>
        {`
          :root {
            --color-1: ${siteColorcode['color-1']};
            --color-2: ${siteColorcode['color-2']};
            --color-3: ${siteColorcode['color-3']};
            --color-4: ${siteColorcode['color-4']};
            --color-5: ${siteColorcode['color-5']};
            --color-6: ${siteColorcode['color-6']};
            --color-7: ${siteColorcode['color-7']};
            --color-8: ${siteColorcode['color-8']};
            --color-9: ${siteColorcode['color-9']};
            --color-10: ${siteColorcode['color-10']};
            --color-11: ${siteColorcode['color-11']};
            --color-12: ${siteColorcode['color-12']};
            --color-13: ${siteColorcode['color-13']};
            --color-14: ${siteColorcode['color-14']};
          }
        `}
      </style>
    </>
  )
}
