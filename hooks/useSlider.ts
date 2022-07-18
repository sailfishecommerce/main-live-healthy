/* eslint-disable no-nested-ternary */
import memoize from 'memoize-one'

import { useMediaQuery } from '@/hooks'

export default function useSlider() {
  const memoisedData = memoize((selectedProducts: any) => selectedProducts)
  const mobile = useMediaQuery('(max-width:426px)')
  const laptop = useMediaQuery('(max-width:1440px)')
  const midLaptop = useMediaQuery('(max-width:1024px)')
  const tablet = useMediaQuery('(max-width:768px)')

  const deviceWidth = mobile
    ? { size: 190, height: 300, width: 400 }
    : tablet
    ? { size: 220, height: 400, width: 720 }
    : midLaptop
    ? { size: 240, height: 400, width: 900 }
    : laptop
    ? { size: 260, height: 400, width: 1200 }
    : { size: 270, height: 400, width: 1450 }

  const productTabWidth = mobile
    ? { size: 300, height: 150, width: 400 }
    : tablet
    ? { size: 250, height: 165, width: 720 }
    : midLaptop
    ? { size: 280, height: 165, width: 950 }
    : laptop
    ? { size: 350, height: 165, width: 1200 }
    : { size: 450, height: 170, width: 1500 }

  return { memoisedData, deviceWidth, productTabWidth }
}
