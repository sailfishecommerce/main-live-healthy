/* eslint-disable no-unneeded-ternary */
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { ToastContainer } from 'react-toastify'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import useScroll from '@/hooks/useScroll'
import useSlidingTab from '@/hooks/useSlidingTab'
import useToast from '@/hooks/useToast'
import { loadingInvoiceAtom, modalAtom } from '@/lib/atomConfig'

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

const DynamicSlidingInformationTab = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SlidingInformationTab' */ '@/components/Slidingtab/SlidingInformationTab'
    ),
  {
    loading: () => <SpinnerRipple />,
  }
)

const DynamicMobileSlideMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobileSlideMenu' */ '@/components/Menu/MobileSlideMenu'
    )
)

const DynamicAuthModal = dynamic(
  () =>
    import(/* webpackChunkName: 'AuthModal' */ '@/components/Modal/AuthModal')
)

const DynamicSlidingCartTab = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SlidingCart' */ '@/components/Slidingtab/SlidingCart'
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
  const [modal, setModal] = useAtom(modalAtom)
  const { slidingTab, activeProductSlide } = useSlidingTab()
  const { appLoading } = useToast()
  const [loading] = useAtom(loadingInvoiceAtom)
  const closeAuthModalHandler = () => setModal(null)
  const modalState = modal === 'MODAL_LOGIN' ? true : false
  const logoutModalState = modal === 'MODAL_LOGOUT' ? true : false
  const { mobileMenu } = useNav()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { scroll } = useScroll()
  const showPointer = scroll > 450 ? true : false
  const ref = useRef(null)

  useEffect(() => {
    if (slidingTab !== null) {
      disableBodyScroll(ref.current)
    } else {
      enableBodyScroll(ref.current)
    }
  }, [slidingTab])

  return (
    <div className="relative">
      <Head>
        <link
          href="https://CZT5MA7JLJ-dsn.algolia.net"
          rel="preconnect"
          crossOrigin="true"
        />
      </Head>
      {(appLoading || loading) && <LoadingBar />}
      <NextNProgress
        color="#f54c4c"
        height={5}
        options={{ showSpinner: true }}
      />
      <ToastContainer />
      {modal === 'MODAL_LOGIN' && (
        <DynamicAuthModal show={modalState} onHide={closeAuthModalHandler} />
      )}
      {slidingTab === 'SLIDING-INFO' && activeProductSlide && (
        <DynamicSlidingInformationTab
          description={activeProductSlide?.description}
        />
      )}
      {slidingTab === 'SLIDING-CART' && <DynamicSlidingCartTab />}
      {slidingTab === 'SLIDING-ACCOUNT' && <DynamicAccountDetailsTab />}
      {slidingTab === 'SLIDING-ACCOUNT-SHIPPING' && (
        <DynamicAccountDetailsTab shipping />
      )}

      {modal === 'MODAL_LOGOUT' && (
        <DynamicLogoutModal
          show={logoutModalState}
          onHide={closeAuthModalHandler}
        />
      )}
      {mobileWidth && mobileMenu && <DynamicMobileSlideMenu />}

      <div className="content position-relative h-100" ref={ref}>
        {children}
      </div>

      {showPointer && (
        <a aria-label="go up" href="#head" className="goUp position-fixed flex">
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
