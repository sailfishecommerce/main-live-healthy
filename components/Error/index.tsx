import Image from 'next/image'
import Link from 'next/link'

const links = [
  { link: '/', title: 'Home', text: 'Return to Home' },
  { link: '/collection', title: 'Continue Shopping', text: 'Shopping now' },
  {
    link: '/customer-care',
    title: 'Help & Support',
    text: 'Visit our help center',
  },
]

export default function Error404() {
  return (
    <div className="container justify-center items-center mx-auto py-2 mb-3">
      <div className="mx-auto flex justify-center flex-col w-1/4 text-center mb-4">
        <Image src="/pages/404.png" height={340} width={340} alt="404 Error" />
        <h1 className="mb-4 font-bold lg:text-xl">404 error</h1>
        <h3 className="mb-4  lg:text-xl text-md mb-4">
          We can&#39;t seem to find the page you are looking for.
        </h3>
        <p className="text-lg mb-4">
          <u>Here are some helpful links instead:</u>
        </p>
      </div>
      <div className="flex mx-auto mb-5 items-center justify-between w-2/3">
        {links.map((link) => (
          <Link passHref key={link.link} href={link.link}>
            <a
              aria-label="go to homepage"
              className="card h-100 border-0 shadow-sm"
            >
              <div className="flex items-center flex-col">
                <h5 className="lg:text-xl text-md font-semibold mb-0">
                  {link.title}
                </h5>
                <p className="text-gray-500 text-lg fs-ms">{link.text}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
