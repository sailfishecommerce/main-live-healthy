import Image from 'next/image'

export default function HeaderBanner() {
  return (
    <div className="w-full">
      <Image
        src="/header-banner.gif"
        height={90}
        width={1440}
        alt="store-banner"
        layout="responsive"
      />
    </div>
  )
}
