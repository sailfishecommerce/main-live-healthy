import { Splide, SplideSlide } from '@splidejs/react-splide'
import Script from 'next/script'

import UserChoiceCard from '@/components/Cards/UserChoiceCard'
import userChoice from '@/json/user-choice.json'
import '@splidejs/splide/dist/css/splide.min.css'

export default function UserchoiceSlider() {
  return (
    <>
      <Script
        src="https://en.trustmate.io/api/widget/5c6b265a-9520-4676-9d01-2ecfca53d95c/script"
        strategy="lazyOnload"
        id="trustmate-widget-script"
      />
      <section className="container mx-auto px-4 md:px-0 userchoice-slider itemSlider">
        <h1 className="text-2xl my-4 font-bold">User Choice</h1>
        <div className="user-choice flex items-center w-full">
          <Splide
            options={{
              perPage: 3,
              breakpoints: {
                500: {
                  perPage: 1,
                  padding: '3rem',
                },
                1000: {
                  perPage: 2,
                },
              },
            }}
            className="w-full"
          >
            <div className="trustmate-card w-1/6">
              <div id="5c6b265a-9520-4676-9d01-2ecfca53d95c"></div>
            </div>
            {userChoice.map((choice: any) => (
              <SplideSlide key={choice.username}>
                <UserChoiceCard choice={choice} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>
    </>
  )
}
