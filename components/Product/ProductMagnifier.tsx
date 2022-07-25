/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import Magnifier from 'react-magnifier'

import ProductOffers from '@/components/Product/ProductOffers'
import useMediaQuery from '@/hooks/useMediaQuery'
import type { ProductProps } from '@/typings'

const Lightbox = dynamic(
  () => import(/* webpackChunkName: 'Lightbox' */ 'react-image-lightbox')
)

export default function ProductMagnifier({ product }: ProductProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const tabletView = useMediaQuery('(max-width:768px)')

  const activethumbnailImg = (index: number) =>
    activeImage === index
      ? 'active border md:rounded-2xl rounded-lg p-1 border-green-500'
      : ''

  const updateActiveImage = (index: number) => setActiveImage(index)

  const images = product?.images

  const onImgClick = () => setLightBoxOpen(!lightBoxOpen)
  const magnifierDimens = tabletView
    ? { height: 300, mgHeight: 300, mgWidth: 300 }
    : { height: 650, mgHeight: 300, mgWidth: 300 }

  const imageView = tabletView
    ? {
        height: 90,
        width: 90,
      }
    : {
        height: 150,
        width: 150,
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
    <div className="p-3 w-full flex flex-col md:w-1/2">
      <div className="main-image">
        <div
          className="product-gallery-preview-item active w-full flex items-center mx-auto"
          onClick={onImgClick}
        >
          <Magnifier
            mgShowOverflow={false}
            mgWidth={magnifierDimens.mgWidth}
            mgHeight={magnifierDimens.mgHeight}
            height={magnifierDimens.height}
            className="img-fluid"
            src={images[activeImage]}
            zoomFactor={1}
            mgShape="square"
          />
          <div className="image-zoom-pane"></div>
        </div>
        {lightBoxOpen && (
          <Lightbox
            mainSrc={images[activeImage]}
            nextSrc={images[(activeImage + 1) % images.length]}
            prevSrc={images[(activeImage + images.length - 1) % images.length]}
            enableZoom={false}
            imageCaption={product.image_alt_text[activeImage]}
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
      <div className="product-gallery-thumblist  mt-4  order-1 w-full lg:order-1">
        {images?.map((image: any, index) => (
          <a
            key={index}
            className={`items-start justify-center flex p-1 md:px-2 cursor-pointer hover:border-green-500 border-gray-500 ${activethumbnailImg(
              index
            )}`}
            aria-label={product.image_alt_text[index]}
            onClick={() => updateActiveImage(index)}
          >
            <Image
              height={imageView.height}
              width={imageView.width}
              src={image}
              alt={product.image_alt_text[index]}
            />
          </a>
        ))}
      </div>
      <ProductOffers className="order-2 hidden md:grid" />
    </div>
  )
}
