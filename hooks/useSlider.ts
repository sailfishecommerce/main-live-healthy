/* eslint-disable no-nested-ternary */
import memoize from 'memoize-one'

import { useMediaQuery } from '@/hooks'
import useWindowDimensions from '@/hooks/useWindowDimensions'

export default function useSlider() {
  const { width } = useWindowDimensions()
  const sliderWidth = width ? width - 15 : width
  const memoisedData = memoize((selectedProducts: any) => selectedProducts)
  const mobile = useMediaQuery(`(max-width:426px)`)
  const laptop = useMediaQuery('(max-width:1440px)')
  const midLaptop = useMediaQuery('(max-width:1024px)')
  const tablet = useMediaQuery('(max-width:768px)')

  const deviceDimension = mobile
    ? { size: 190, height: 300, width: sliderWidth }
    : tablet
    ? { size: 220, height: 290, width: 720 }
    : midLaptop
    ? { size: 240, height: 370, width: 900 }
    : laptop
    ? { size: 260, height: 380, width: 1200 }
    : { size: 270, height: 400, width: 1450 }

  const productTabDimension = mobile
    ? { size: 300, height: 120, width: sliderWidth }
    : tablet
    ? { size: 250, height: 165, width: 720 }
    : midLaptop
    ? { size: 280, height: 165, width: 950 }
    : laptop
    ? { size: 350, height: 165, width: 1200 }
    : { size: 450, height: 170, width: 1500 }

  const recommendationDimension = mobile
    ? { size: 200, height: 420, width: 400 }
    : tablet
    ? { size: 250, height: 420, width: 600 }
    : midLaptop
    ? { size: 280, height: 420, width: 500 }
    : laptop
    ? { size: 200, height: 420, width: 600 }
    : { size: 200, height: 420, width: 800 }

  return {
    memoisedData,
    deviceDimension,
    productTabDimension,
    recommendationDimension,
  }
}
