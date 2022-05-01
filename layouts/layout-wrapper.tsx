/* eslint-disable no-unneeded-ternary */
import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import LayoutMetatag from '@/components/Metatag/LayoutMetatag'
import { useAppSelector } from '@/hooks/useRedux'
import useScroll from '@/hooks/useScroll'
import useSlidingTab from '@/hooks/useSlidingTab'
import useUI from '@/hooks/useUI'
import 'react-toastify/dist/ReactToastify.css'

const NextNProgress = dynamic(
  () =>
    import(/* webpackChunkName: 'NProgress' */ '@/components/Loader/NProgress')
)
const LoadingBar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'LoadingBar' */ '@/components/Loader/LoadingBar'
    )
)
const SpinnerOverlay = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SpinnerOverlay' */ '@/components/Loader/SpinnerOverlay'
    )
)

const DynamicSlidingInformationTab = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SlidingInformationTab' */ '@/components/Slidingtab/SlidingInformationTab'
    )
)

const DynamicAuthModal = dynamic(
  () =>
    import(/* webpackChunkName: 'AuthModal' */ '@/components/Modal/AuthModal')
)

const DynamicSlidingCartTab = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SlidingCartTab' */ '@/components/Slidingtab/SlidingCartTab'
    )
)

const DynamicAccountDetailsTab = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AccountDetails' */ '@/components/Slidingtab/AccountDetails'
    )
)

const DynamicLogoutModal = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicLogoutModal' */ '@/components/Modal/LogoutModal'
    )
)

interface Props {
  children: JSX.Element
}

export default function LayoutWrapper({ children }: PropsWithChildren<Props>) {
  const { slideTab } = useSlidingTab()
  const { activeProduct } = useAppSelector((state) => state.product)
  const {
    displayAuthModal,
    displayLogoutModal,
    toggleAuthModalHandler,
    toggleLogoutModalHandler,
  } = useUI()
  const { scroll } = useScroll()
  const { loading: loadingState } = useAppSelector((state) => state.UI)
  const { loading } = useAppSelector((state) => state.checkout)

  const showPointer = scroll > 450 ? true : false

  return (
    <div>
      <Head>
        <link
          href="https://CZT5MA7JLJ-dsn.algolia.net"
          rel="preconnect"
          crossOrigin="true"
        />
      </Head>
      <LayoutMetatag />
      <div data-aos="fade-up" id="head" />
      {loading && <SpinnerOverlay />}
      {loadingState && <LoadingBar />}
      <NextNProgress color="#95bf11" options={{ showSpinner: true }} />
      <ToastContainer />
      {displayAuthModal && (
        <DynamicAuthModal
          show={displayAuthModal}
          onHide={toggleAuthModalHandler}
        />
      )}
      {slideTab === 'SLIDING-INFO' && activeProduct && (
        <DynamicSlidingInformationTab product={activeProduct} />
      )}
      {slideTab === 'SLIDING-CART' && <DynamicSlidingCartTab />}
      {slideTab === 'SLIDING-ACCOUNT' && <DynamicAccountDetailsTab />}
      {displayLogoutModal && (
        <DynamicLogoutModal
          show={displayLogoutModal}
          onHide={toggleLogoutModalHandler}
        />
      )}
      <div className="content position-relative h-100">{children}</div>

      {showPointer && (
        <a
          aria-label="go up"
          href="#head"
          data-aos="fade-right-up"
          className="goUp position-fixed flex"
        >
          <i className="fas fa-arrow-circle-up"></i>
        </a>
      )}

      <style jsx>
        {`
          .goUp {
            font-size: 25px;
            right: 20px;
            bottom: 20px;
            z-index: 1000;
          }
          .goUp:hover {
            color: red;
            background-color: white;
          }
          .goUp:hover i {
            color: red;
          }
          .goUp i {
            position: fixed;
            right: 20px;
            z-index: 200;
            bottom: 20px;
          }
        `}
      </style>
    </div>
  )
}

// LayoutWrapper.whyDidYouRender = true;
