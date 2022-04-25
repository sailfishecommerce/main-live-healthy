import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'

interface CheckoutBannerProps {
  title: string
  breadcrumb: string
}

export default function CheckoutBanner({
  title,
  breadcrumb,
}: CheckoutBannerProps) {
  return (
    <div className="w-full bg-gray-700 h-60 items-center flex">
      <div className="container flex-col md:flex-row mx-auto items-center -mt-14 flex justify-between">
        <div className="lg:order-2 mb-3 lg:mb-0 lg:pt-2 w-full md:w-1/2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-center justify-content-lg-start">
              <li className="breadcrumb-item">
                <Link passHref href="/">
                  <a aria-label="Home" className="text-nowrap">
                    <AiOutlineHome className="mr-2" />
                    Home
                  </a>
                </Link>
              </li>
              <li className="breadcrumb-item text-nowrap">
                <Link passHref href="/shop">
                  <a aria-label="shop">Shop</a>
                </Link>
              </li>
              <li
                className="breadcrumb-item text-nowrap active"
                aria-current="page"
              >
                {breadcrumb}
              </li>
            </ol>
          </nav>
        </div>
        <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
          <h1 className="h3 text-light mb-0">{title}</h1>
        </div>
      </div>
    </div>
  )
}
