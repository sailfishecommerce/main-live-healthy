/* eslint-disable no-unneeded-ternary */
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import LayoutMetatag from '@/components/Metatag/LayoutMetatag'
import useScroll from '@/hooks/useScroll'
import 'react-toastify/dist/ReactToastify.css'
import useSlidingTab from '@/hooks/useSlidingTab'
import useToast from '@/hooks/useToast'
import { activeProductSlideAtom, modalAtom } from '@/lib/atomConfig'

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
  const [modal, setModal] = useAtom(modalAtom)
  const { slidingTab } = useSlidingTab()
  const [activeProductSlide]: any = useAtom<any>(activeProductSlideAtom)
  const { appLoading } = useToast()
  const closeAuthModalHandler = () => setModal(null)
  const modalState = modal === 'MODAL_LOGIN' ? true : false
  const { scroll } = useScroll()

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
      {appLoading && <SpinnerOverlay />}
      {appLoading && <LoadingBar />}
      <NextNProgress color="#95bf11" options={{ showSpinner: true }} />
      <ToastContainer />
      {modal === 'MODAL_LOGIN' && (
        <DynamicAuthModal show={modalState} onHide={closeAuthModalHandler} />
      )}
      {slidingTab === 'SLIDING-INFO' && activeProductSlide && (
        <DynamicSlidingInformationTab product={activeProductSlide} />
      )}
      {slidingTab === 'SLIDING-CART' && <DynamicSlidingCartTab />}
      {slidingTab === 'SLIDING-ACCOUNT' && <DynamicAccountDetailsTab />}
      {modal === 'MODAL_LOGOUT' && (
        <DynamicLogoutModal show={modalState} onHide={closeAuthModalHandler} />
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
