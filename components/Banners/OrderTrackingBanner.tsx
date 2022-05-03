import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

export default function OrderTrackingBanner() {
  return (
    <div className="bg-mountain-green py-4">
      <div className="container flex justify-between py-4 font-bold text-white text-xl">
        <nav aria-label="breadcrumb" className="lg:order-2">
          <ol className="breadcrumb breadcrumb-light text-sm flex items-center  justify">
            <li className="breadcrumb-item hover:text-red-500">
              <Link passHref href="/">
                <a aria-label="home" className="text-nowrap">
                  <i className="ci-home"></i>Home
                </a>
              </Link>
            </li>
            <li>
              <MdOutlineArrowForwardIos className="mx-2" />
            </li>
            <li className="breadcrumb-item hover:text-red-500">
              <Link passHref href="/Collection">
                <a aria-label="shop">Collection</a>
              </Link>
            </li>
            <li>
              <MdOutlineArrowForwardIos className="mx-2" />
            </li>
            <li
              className="breadcrumb-item text-nowrap active"
              aria-current="page"
            >
              Order tracking
            </li>
          </ol>
        </nav>
        <div className="lg:order-1">
          <h1 className="h3 text-light mb-0">
            Tracking Order <span className="h4 fw-normal text-light"></span>
          </h1>
        </div>
      </div>
    </div>
  )
}
