import { Splide, SplideSlide } from '@splidejs/react-splide'
import { memo } from 'react'
import '@splidejs/splide/dist/css/splide.min.css'

import useDiscount from '@/hooks/useDiscount'

function DiscountSliderComponent() {
  const [discount, status] = useDiscount()
  console.log('discount', discount)
  return (
    <div>
      {status === 'success' && (
        <Splide
          className="w-full"
          options={{
            type: 'loop',
            height: '3rem',
            direction: 'ttb',
            autoplay: true,
          }}
        >
          {discount.map((item: any, index: number) => {
            const slideBg = `slider${index}`
            return (
              <SplideSlide key={item.id}>
                <div
                  className={`${slideBg} w-full item h-full slider flex items-center m-auto justify-center text-white`}
                >
                  <div className="description font-thin mr-4">
                    Benefit from our awesome discount using this coupon code
                  </div>
                  |
                  <span className="font-bold text-xl flex mx-2 items-center">
                    🔥 🛒
                    <p className="ml-2">{item.code}</p>
                  </span>{' '}
                  |
                  <p className="font-light text-center my-0 mb-0 mx-0 md:mx-2 text-sm md:text-sm ">
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
                      background-color: var(--mountain-green);
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
