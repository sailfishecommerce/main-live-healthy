import type { PropsWithChildren } from 'react'

import useUI from '@/hooks/useUI'

export default function ContactInformationForm({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const { toggleAuthModalHandler }: any = useUI()

  return (
    <div className="contact-information border-b pb-2 mb-6">
      <div className="flex flex-col mb-4">
        <h5>Contact information</h5>
        <p className="text-gray-500 font-light">
          Already have an account?{' '}
          <button
            type="button"
            className="mountain-mist font-semibold"
            onClick={toggleAuthModalHandler}
          >
            Log in
          </button>
        </p>
      </div>
      {children}

      <span className="flex items-center">
        <input type="checkbox" className="mr-4 -mt-4" />
        <div className="text flex flex-col mb-4">
          <p>Send me email for my order details & shipping updates.</p>
          <p>Latest & exclusive offers from LiveHealthy!</p>
        </div>
      </span>
    </div>
  )
}
