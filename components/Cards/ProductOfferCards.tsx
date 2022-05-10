import Image from 'next/image'

interface Props {
  offer: {
    title: string
    text: string
    icon: string
  }
}

export default function ProductOfferCards({ offer }: Props) {
  return (
    <div
      className="border flex flex-col justify-start items-start rounded-lg p-4"
      title={offer.title}
    >
      <div className="w-6 h-6 mb-0 md:mb-2">
        <Image src={offer.icon} alt={offer.title} height={50} width={50} />
      </div>
      <h5 className="lg:text-md text-sm font-bold md:mx-2 md:ml-0">
        {offer.title}
      </h5>
      <p className="text-xs md:text-sm my-1">{offer.text}</p>
    </div>
  )
}
