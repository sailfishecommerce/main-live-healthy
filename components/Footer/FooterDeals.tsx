import { useState } from 'react'
import { toast } from 'react-toastify'

export default function FooterDeals() {
  const [newsletterEmail, setNewsletterEmail] = useState(null)
  function subscribeToNewsletterHanndler(e: any) {
    setNewsletterEmail(e.target.value)
  }

  function onSubmitHandler(e: any) {
    e.preventDefailt()
    if (newsletterEmail !== null) {
      toast.success(
        `Thanks for subscribing ${newsletterEmail} to our newsletter`
      )
    }
  }
  return (
    <div className="flex flex-col w-full md:mb-4 mb-0 order-1 md:w-1/4">
      <h4 className="font-bold mt-4 mb-2 md:mb-6 text-lg lg:text-xl">
        Get deals in your inbox
      </h4>
      <form className="deal-form flex items-center" onSubmit={onSubmitHandler}>
        <input
          required={true}
          placeholder="Enter your e-mail"
          type="email"
          className="bg-transparent border-b-2 border-black w-full"
          onChange={subscribeToNewsletterHanndler}
        />
        <button
          aria-label="join"
          type="submit"
          className="mb-0 border-b-2 border-black"
        >
          Join
        </button>
      </form>
    </div>
  )
}
