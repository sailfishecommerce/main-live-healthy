import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

import firebaseDatabase from '@/lib/firebaseDatabase'

interface LogoProps {
  className: string
}

function LogoComponent({ className }: LogoProps) {
  const logoClassName = className ? className : ' w-full h-full'
  const [logoUrl, setLogoUrl] = useState(null)

  useEffect(() => {
    const { readFromDB } = firebaseDatabase()
    readFromDB('logo', setLogoUrl)
  }, [])

  return (
    <Link passHref href="/">
      <a title="welcome to live healthy" className={logoClassName}>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="logo"
            height={50}
            width={150}
            layout="responsive"
          />
        )}
      </a>
    </Link>
  )
}

const Logo = memo(LogoComponent)
export default Logo
