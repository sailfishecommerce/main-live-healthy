import { memo } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'

import sliderContent from '@/json/topbar-slider.json'
import '@splidejs/splide/dist/css/splide.min.css'

const sliderArray: any = sliderContent

function TopbarSliderComponent() {
  return (
    <div className="header-slider flex items-center mx-auto w-full md:w-1/4 justify-center">
      <Splide
        options={{
          type: 'loop',
          height: '3rem',
          direction: 'ttb',
          autoplay: true,
        }}
      >
        {sliderArray.map((content: any, index: number) => (
          <SplideSlide key={index}>
            <div className="item slider-container flex items-center m-auto justify-center">
              {/* <div className="w-1/5"> */}
              <Image
                height={50}
                width={50}
                src={content.icon}
                alt={content.text}
              />
              {/* </div> */}
              <p className="text-white font-bold text-center my-0 mb-0 mx-0 md:mx-2 text-sm md:text-sm ">
                {content.text}
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

const TopbarSlider = memo(TopbarSliderComponent)
export default TopbarSlider
