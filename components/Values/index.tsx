import ValueCard from '@/components/Cards/ValueCard'
import LazyLoader from '@/components/Loader/LazyLoader'
import ValuesSlider from '@/components/Slider/ValuesSlider'
import { useMediaQuery } from '@/hooks'
import values from '@/json/values.json'

export default function Values() {
  const tabWidth = useMediaQuery('(max-width:1000px)')

  return (
    <LazyLoader height={200} mobileHeight={180}>
      <section className="container values mx-auto mb-8 px-4 xl:px-0">
        {tabWidth ? (
          <ValuesSlider />
        ) : (
          <div className="row flex md:grid md:grid-cols-4 md:gap-8 my-4 items-center justify-between w-full">
            {values.map((value) => (
              <ValueCard content={value} key={value.title} />
            ))}
          </div>
        )}
        <style jsx>
          {`
            @media (max-width: 768px) {
              .values .row {
                overflow-x: scroll;
                width: 100vw;
              }
            }
          `}
        </style>
      </section>
    </LazyLoader>
  )
}
