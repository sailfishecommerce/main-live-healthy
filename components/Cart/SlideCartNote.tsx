export default function SlideCartNote() {
  return (
    <div>
      <div className="note">
        <h5 className="text-sm text-center md:text-md">
          Pro Club is our all-access community of doctors,medical professionals
          and administrators who receive first access to our new products,
          industry insights and enhanced data profiles.
        </h5>
        <button
          aria-label="Livehealthy Pro Club - Learn more"
          className="bg-red-500 text-white text-xs rounded-md p-2 mx-auto flex my-2"
          type="button"
        >
          LEARN MORE
        </button>
      </div>
      <style jsx>
        {`
          .note {
            padding: 10px;
            border-radius: 5px;
            background-color: #eef2fb;
            margin: 20px;
          }
        `}
      </style>
    </div>
  )
}

export function CheckoutNote() {
  return (
    <div>
      <p className="text-center">Free Shipping worldwide.</p>
      <p className="text-center">
        All orders are shipped from Hong Kong or China using Air Freight.
        Deliveries may take between 1 to 4 weeks depending on your location.
      </p>
    </div>
  )
}
