import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

import useDatabaseData from '@/hooks/useDatabaseData'

interface LogoProps {
  className: string
}

function LogoComponent({ className }: LogoProps) {
  const [logoURL, setLogoUrl] = useState('/logo.webp')
  const logoClassName = className ? className : ' w-full h-full'
  const { dbdata, loading } = useDatabaseData('logo')

  useEffect(() => {
    if (!loading && dbdata !== null) {
      setLogoUrl(dbdata)
    }
  }, [dbdata, loading])

  return (
    <Link passHref href="/">
      <a title="welcome to live healthy" className={logoClassName}>
        <Image
          src={logoURL}
          alt="logo"
          height={50}
          width={150}
          layout="responsive"
        />
      </a>
    </Link>
  )
}

const Logo = memo(LogoComponent)
export default Logo
