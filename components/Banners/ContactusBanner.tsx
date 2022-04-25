import Link from "next/link";
import { HiHome } from "react-icons/hi";

export default function ContactBanner() {
  return (
    <div className="bg-gray-100 w-full py-8 mb-4">
      <div className="container m-auto px-8 md:px-0 flex justify-between items-center py-2 lg:py-3">
        <div className="lg:order-2 mb-3 lg:mb-0 lg:pt-2">
          <nav aria-label="nav">
            <ol className="flex lg:flex-nowrap justify-center">
              <li className="hover:text-red-500 text-gray-500">
                <Link href="/" passHref>
                  <a aria-label="home" className="flex items-center">
                    <HiHome className="mx-1" />
                    Home
                  </a>
                </Link>
              </li>
              <li className="mx-2">&gt;</li>
              <li className="text-gray-500" aria-current="page">
                Contacts
              </li>
            </ol>
          </nav>
        </div>
        <div className="lg:order-1 lg:pr-4 text-center lg:text-left">
          <h1 className="md:text-2xl text-lg mb-0 text-gray-600">
            Contacts us
          </h1>
        </div>
      </div>
    </div>
  );
}
