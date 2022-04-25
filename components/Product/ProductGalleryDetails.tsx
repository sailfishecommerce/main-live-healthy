import type { PropsWithChildren } from 'react'

import ProductDetail from '@/components/Product/ProductDetail'
import ProductGallery from '@/components/Product/ProductGallery'
import type { productType } from '@/typings'

interface Props {
  product: productType
}

interface ContainerProps {
  children: any
}

function ProductGalleryDetailsContainer({
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div className="container m-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg mb-5 -mt-20 md:p-12 p-3">
      {children}
    </div>
  )
}

export default function ProductGalleryDetails({ product }: Props) {
  return (
    <ProductGalleryDetailsContainer>
      <ProductGallery product={product} />
      <ProductDetail product={product} />
    </ProductGalleryDetailsContainer>
  )
}
