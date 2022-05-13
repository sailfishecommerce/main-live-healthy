import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <main className="mx-auto lg:flex-row flex-col bg-light-gray rounded-xl h-full mb-4 container flex items-center">
      <div className="content lg:w-1/2 w-full border-r border-gray-900">
        <h2 className="text-center text-2xl font-bold">
          Hello dear, your cart is empty
        </h2>
        <Link passHref href="/collection">
          <button
            type="button"
            aria-label="continue shopping"
            className="border hover:border-none hover:bg-green-300 hover:text-white border-gray-500 p-3  mx-auto flex justify-center my-4"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
      <div className="image-wrapper w-full lg:w-1/2">
        <Image
          src="/empty-cart.webp"
          alt="empty cart"
          height={500}
          width={700}
        />
      </div>
    </main>
  )
}
