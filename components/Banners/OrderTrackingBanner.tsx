import Link from 'next/link'

export default function OrderTrackingBanner() {
  return (
    <div className="bg-dark py-4">
      <div className="container d-lg-flex justify-between py-2 py-lg-3">
        <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-center justify-content-lg-start">
              <li className="breadcrumb-item">
                <Link passHref href="/">
                  <a aria-label="home" className="text-nowrap">
                    <i className="ci-home"></i>Home
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
                Order tracking
              </li>
            </ol>
          </nav>
        </div>
        <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
          <h1 className="h3 text-light mb-0">
            Track your order <span className="h4 fw-normal text-light"></span>
          </h1>
        </div>
      </div>
    </div>
  )
}
