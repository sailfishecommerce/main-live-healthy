import ProductOfferCards from '@/components/Cards/ProductOfferCards'
import productOffers from '@/json/product-offers.json'

interface Props {
  className?: string
}

export default function ProductOffers({ className }: Props) {
  return (
    <div
      className={`${className} product-offers justify-between my-4 flex flex-wrap md:flex-row items-center grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2`}
    >
      {productOffers.map((offer) => (
        <ProductOfferCards offer={offer} key={offer.text} />
      ))}
    </div>
  )
}
