import dynamic from 'next/dynamic'
import Link from 'next/link'

import WishlistItem from '@/components/WishlistItem'
import wishlistItemContent from '@/json/wishlist-items.json'
import Applayout from '@/layouts/app-layout'

const DynamicDashboardSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DashboardSidebar' */ '@/components/Sidebar/DashboardSidebar'
    )
)

export default function AccountWishlist() {
  return (
    <Applayout title="Your Wishlist">
      <div className="page-title-overlap bg-dark pt-4">
        <div className="container d-lg-flex justify-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <a aria-label="home" className="text-nowrap" href="index">
                    <i className="ci-home"></i>Home
                  </a>
                </li>
                <li className="breadcrumb-item text-nowrap">
                  <a aria-label="account" href="#account">
                    Account
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Wishlist
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">My wishlist</h1>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <DynamicDashboardSidebar />
          <section className="col-lg-8">
            <div className="d-none d-lg-flex justify-between items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
              <h6 className="fs-base text-light mb-0">
                List of items you added to wishlist:
              </h6>
              <Link passHref href="/account-signin">
                <a aria-label="sign out" className="btn btn-primary btn-sm">
                  <i className="ci-sign-out mx-2"></i>Sign out
                </a>
              </Link>
            </div>
            {wishlistItemContent.map((content) => (
              <WishlistItem key={content.image} content={content} />
            ))}
          </section>
        </div>
      </div>
    </Applayout>
  )
}
