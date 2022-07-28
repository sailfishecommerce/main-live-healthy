import { Splide, SplideSlide } from '@splidejs/react-splide'

import ValueCard from '@/components/Cards/ValueCard'
import values from '@/json/values.json'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ValuesSlider() {
  return (
    <Splide
      options={{
        perPage: 1,
        padding: '2rem',
        breakpoints: {
          450: {
            perPage: 1,
          },
          780: {
            perPage: 2,
          },
          1000: {
            perPage: 3,
          },
        },
      }}
      className="values-slider container mx-auto"
    >
      {values.map((value: any) => (
        <SplideSlide key={value.title}>
          <ValueCard content={value} key={value.title} />
        </SplideSlide>
      ))}
    </Splide>
  )
}
