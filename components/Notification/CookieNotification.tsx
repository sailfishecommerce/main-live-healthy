import { useAtom } from 'jotai'
import Link from 'next/link'

import { cookieConsentAtom } from '@/lib/atomConfig'

export default function CookieNotification() {
  const [, setShowCookie] = useAtom(cookieConsentAtom)

  function cookieNotificationHandler() {
    setShowCookie(false)
  }
  return (
    <>
      <div className="flex items-center justify-between xl:px-20 lg:px-16 px-10  py-2 bg-mountain-mist">
        <div className="text-content white">
          This website uses cookies. Cookies improve your experience, by
          browsing our site you agree to our
          <Link passHref href="/customer-care/cookie-policy">
            <a className="tan-hide"> Cookie policy</a>
          </Link>
        </div>
        <button
          type="button"
          className="border-tan-hide px-2"
          onClick={cookieNotificationHandler}
        >
          GOT IT
        </button>
      </div>
    </>
  )
}
