import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link passHref href="/">
      <a
        title="welcome to live healthy"
        className={`${className} w-full h-full`}
      >
        <Image
          src="/logo.webp"
          alt="logo"
          height={50}
          width={130}
          layout="responsive"
        />
      </a>
    </Link>
  )
}
