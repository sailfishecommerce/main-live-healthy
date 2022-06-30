/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Magnifier from 'react-magnifier'

import Image from '@/components/Image'
import useMediaQuery from '@/hooks/useMediaQuery'
import type { productType } from '@/typings/types'
import 'react-image-lightbox/style.css'

const Lightbox = dynamic(
  () => import(/* webpackChunkName: 'Lightbox' */ 'react-image-lightbox')
)

interface Props {
  product: productType
  isMobile?: boolean
}

export default function ProductGalleryView({ product, isMobile }: Props) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const mobileView = useMediaQuery('(max-width:768px)')

  const imageSize = isMobile ? 'w-1/3 lg:w-full' : 'w-1/3 lg:w-full'
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

  const productImage =
    typeof product.images[activeImage] === 'string'
      ? product.images[activeImage]
      : product.images[activeImage].file.url

  return (
    <div className="product-gallery w-full flex flex-col md:flex-row">
      <div className="product-gallery-preview lg:order-2 w-full md:w-4/5">
        <div
          className="product-gallery-preview-item active"
          onClick={onImgClick}
        >
          <Magnifier
            mgShowOverflow={false}
            mgWidth={2000}
            mgHeight={2000}
            className="img-fluid"
            src={productImage}
            zoomFactor={0.11}
          />
          <div className="image-zoom-pane"></div>
        </div>
        {lightBoxOpen && (
          <Lightbox
            mainSrc={images[activeImage]}
            nextSrc={images[(activeImage + 1) % images.length]}
            prevSrc={images[(activeImage + images.length - 1) % images.length]}
            imageCaption={product.image_alt_text[activeImage]}
            enableZoom={false}
            reactModalStyle={customStyles}
            onCloseRequest={() => setLightBoxOpen(false)}
            onMovePrevRequest={() =>
              setActiveImage((activeImage + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % images.length)
            }
          />
        )}
      </div>
      <div
        className={`product-gallery-thumblist ${thumblistClass} flex hidden md:flex flex-wrap w-full lg:flex-col lg:order-1 lg:w-1/5`}
      >
        {images?.map((image: any, index: number) => (
          <a
            key={index}
            className={`items-center justify-center ${imageSize} flex px-2 hover:border border-red-500 ${activethumbnailImg(
              index
            )}`}
            onClick={() => updateActiveImage(index)}
          >
            <Image
              height={imageView.height}
              width={imageView.width}
              src={image}
              alt={product.image_alt_text[index]}
              size="true"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
