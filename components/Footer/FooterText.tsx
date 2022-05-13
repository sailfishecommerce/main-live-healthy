import { FaWhatsapp } from 'react-icons/fa'

export default function FooterText() {
  return (
    <>
      <div className="call-us bg-white rounded-lg p-3 w-5/6 my-4 md:my-3">
        <span className="flex items-center">
          <FaWhatsapp fill="green" />
          <p className="font-bold mx-2">Call Us: 9442 2060</p>
        </span>
        <hr />
        <div className="opening-hrs">
          <h6>
            <span className="font-bold mr-1">Opening Hours:</span> Mon - Sat:
            9:00 am - 6:00 pm
          </h6>
        </div>
      </div>
      <div className="text text-sm w-full">
        <p>
          We are an online business operating out of Sydney, Australia. All
          products are shipped weekly from Sydney to Hong Kong. No minimum
          orders for Hong Kong, shipping via HK Post, and SF Express.
        </p>
      </div>
    </>
  )
}
