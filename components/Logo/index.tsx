import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

interface LogoProps {
  className: string
}

function LogoComponent({ className }: LogoProps) {
  const logoClassName = className ? className : ' w-full h-full'

  return (
    <Link passHref href="/">
      <a title="welcome to live healthy" className={logoClassName}>
        <Image
          src="/logo.webp"
          alt="logo"
          height={25}
          width={80}
          layout="responsive"
        />
      </a>
    </Link>
  )
}

const Logo = memo(LogoComponent)
export default Logo
