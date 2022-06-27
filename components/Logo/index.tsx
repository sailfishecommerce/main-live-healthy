import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

import useDatabaseData from '@/hooks/useDatabaseData'

interface LogoProps {
  className: string
}

function LogoComponent({ className }: LogoProps) {
  const logoClassName = className ? className : ' w-full h-full'
  const { dbdata: logoUrl } = useDatabaseData('logo')

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
