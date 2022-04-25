import ProductOfferCards from '@/components/Cards/ProductOfferCards'
import productOffers from '@/json/product-offers.json'

interface Props {
  className?: string
}

export default function ProductOffers({ className }: Props) {
  return (
    <div
      className={`${className} product-offers justify-between my-4 flex flex-wrap md:flex-row items-center grid grid-cols-3 gap-4`}
    >
      {productOffers.map((offer, index) => (
        <ProductOfferCards offer={offer} key={index} />
      ))}
    </div>
  )
}
