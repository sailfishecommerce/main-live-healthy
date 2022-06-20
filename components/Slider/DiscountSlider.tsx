import { Splide, SplideSlide } from '@splidejs/react-splide'
import axios from 'axios'
import { memo, useEffect } from 'react'

import '@splidejs/splide/dist/css/splide.min.css'
import availableDiscount from '@/json/available-discount.json'

function DiscountSliderComponent() {
  useEffect(() => {
    if (availableDiscount.length === 0) {
      axios.get('/api/get-available-discount')
    }
  }, [])

  return (
    <div>
      {availableDiscount.length > 0 && (
        <Splide
          className="w-full"
          options={{
            type: 'loop',
            height: '3rem',
            direction: 'ttb',
            autoplay: true,
          }}
        >
          {availableDiscount.map((item: any, index: number) => {
            const slideBg = `slider${index}`
            return (
              <SplideSlide key={item.id}>
                <div
                  className={`${slideBg} w-full item h-full slider discount-slider flex items-center m-auto justify-center text-white`}
                >
                  <div className="description hidden lg:block text-xs lg:text-sm font-thin mr-4">
                    Benefit from our awesome discount using this coupon code
                  </div>
                  <span className="hidden lg:block">|</span>
                  <div className="font-bold text-xs lg:text-xl flex mx-2 items-center">
                    <span className="hidden  lg:block">🔥 🛒</span>
                    <p className="ml-2">{item.code}</p>
                  </div>{' '}
                  <span className="hidden lg:block">|</span>
                  <p className="font-light lg:text-center my-0 mb-0 mx-0 md:mx-2 text-xs lg:text-sm ">
                    {item.description}
                  </p>
                </div>
                <style jsx>
                  {`
                    .slider0 {
                      background-color: orange;
                    }
                    .slider1 {
                      background-color: #49366b;
                    }
                    .slider2 {
                      background-color: var(--color-1);
                    }
                  `}
                </style>
              </SplideSlide>
            )
          })}
        </Splide>
      )}
    </div>
  )
}

const DiscountSlider = memo(DiscountSliderComponent)

export default DiscountSlider
