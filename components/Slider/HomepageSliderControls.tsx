import { memo } from 'react'

interface Props {
  content: Array<{
    title: string
    category: string
  }>
  activeIndex: number
}
function HomepageSliderControlsComponent({ content, activeIndex }: Props) {
  return (
    <div className="rounded-3xl border slider-item-wrapper border-gray-100 flex items-center bg-white w-11/12 p-8 flex justify-between mx-auto h-36 mb-4 -mt-20 lg:-mt-24 relative">
      {content.map((item, index) => {
        const indexValue = Number(index) + 1
        const isActive = activeIndex === index ? 'active' : ''
        return (
          <button
            type="button"
            className={`slider-item relative items-center justify-center splide__pagination__page flex order-t-2 pt-2 ${isActive}`}
            key={item.title}
            title={item.title}
          >
            <h4 className="flex left-0 items-center absolute font-medium">
              0{indexValue}
            </h4>
            <div className="text-content">
              <h2 className="font-bold my-1">{item.title}</h2>
              <p>{item.category}</p>
            </div>
          </button>
        )
      })}
      <style jsx>
        {`
          .slider-item {
            width: 100%;
            background: unset;
            height: unset;
            display: flex;
            margin: unset;
            border-top: 1px solid #e7e6e9;
            border-radius: unset;
            opacity: unset;
            padding: 10px 0px;
            position: unset;
            transition: unset;
            position: relative;
          }
          .slider-item.active {
            border-top: 3px solid var(--color-1);
          }
          .slider-item.active h4 {
            color: var(--color-1);
          }

          @media (max-width: 1000px) {
            button.slider-item {
              font-size: 11px;
            }
            .slider-item-wrapper {
              padding: 15px;
              margin-top: -120px;
              height: 130px;
            }
          }
        `}
      </style>
    </div>
  )
}
const HomepageSliderControls = memo(HomepageSliderControlsComponent)
export default HomepageSliderControls
