import Magnifier from 'react-magnifier'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const Lightbox = dynamic(
  () => import(/* webpackChunkName: 'common' */ 'react-image-lightbox')
)

import { productType } from '@/types'
import Image from '@/components/Image'
import useMediaQuery from '@/hooks/useMediaQuery'
import 'react-image-lightbox/style.css'

interface Props {
  product: productType
  isMobile?: boolean
}

export default function ProductGalleryView({ product, isMobile }: Props) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const mobileView = useMediaQuery('(max-width:768px)')

  const imageSize = isMobile ? 'w-1/3 laptop:w-full' : 'w-1/3 laptop:w-full'
  const thumblistClass = isMobile ? 'mobile' : 'desktop'

  const imageView = mobileView
    ? {
        height: 90,
        width: 90,
      }
    : {
        height: 150,
        width: 150,
      }

  const activethumbnailImg = (index: number) =>
    activeImage === index ? 'active border border-red-500' : ''

  function updateActiveImage(index: number) {
    setActiveImage(index)
  }

  const images = product?.images

  const onImgClick = () => {
    setLightBoxOpen(!lightBoxOpen)
  }

  const customStyles = {
    overlay: {
      zIndex: '5000',
    },
    bodyOpen: {
      position: 'fixed',
    },
  }

  return (
    <div className="product-gallery w-full flex flex-col tablet:flex-row">
      <div className="product-gallery-preview laptop:order-2 w-full tablet:w-4/5">
        <div
          onClick={onImgClick}
          className="product-gallery-preview-item active"
        >
          <Magnifier
            mgShowOverflow={false}
            mgWidth={2000}
            mgHeight={2000}
            className="img-fluid"
            src={images[activeImage].file.url}
            zoomFactor={0.11}
          />
          <div className="image-zoom-pane"></div>
        </div>
        {lightBoxOpen && (
          <Lightbox
            mainSrc={images[activeImage].file.url}
            nextSrc={images[(activeImage + 1) % images.length].file.url}
            prevSrc={
              images[(activeImage + images.length - 1) % images.length].file.url
            }
            onCloseRequest={() => setLightBoxOpen(false)}
            imageCaption={product.image_alt_text[activeImage]}
            onMovePrevRequest={() =>
              setActiveImage((activeImage + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % images.length)
            }
            enableZoom={false}
            reactModalStyle={customStyles}
          />
        )}
      </div>
      <div
        className={`product-gallery-thumblist ${thumblistClass} flex hidden tablet:flex flex-wrap w-full laptop:flex-col laptop:order-1 laptop:w-1/5`}
      >
        {images?.map((image: any, index) => (
          <a
            className={`items-center justify-center ${imageSize} flex px-2 hover:border border-red-500 ${activethumbnailImg(
              index
            )}`}
            onClick={() => updateActiveImage(index)}
            key={index}
            aria-label={product.image_alt_text[index]}
          >
            <Image
              height={imageView.height}
              width={imageView.width}
              src={image.file.url}
              alt={product.image_alt_text[index]}
              size="true"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
