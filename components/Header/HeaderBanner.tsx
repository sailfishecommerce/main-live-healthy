import Image from 'next/image'

export default function HeaderBanner() {
  return (
    <div className="w-full">
      <Image
        src="/promo-banner.gif"
        height={45}
        width={1440}
        alt="store-banner"
        layout="responsive"
      />
    </div>
  )
}
