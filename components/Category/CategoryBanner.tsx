import Link from 'next/link'

import Image from '@/components/Image'

export default function CategoryBanner() {
  return (
    <div className="tablet:w-1/3 hidden laptop:flex mr-4">
      <div className="categoryBannerColor flex flex-col h-100 overflow-hidden rounded-lg">
        <div className="flex justify-between">
          <div>
            <h3 className="mb-1 text-2xl capitalize mt-4 ml-8">
              Explore our collections
            </h3>
            <Link passHref href="/shop">
              <a
                aria-label="get started now"
                className="text-white ml-8 mt-4 text-lg hover:text-red-500"
              >
                Get started now
                <i className="ci-arrow-right fs-xs align-middle ms-1"></i>
              </a>
            </Link>
          </div>
        </div>
        <Link passHref href="/shop">
          <a aria-label="shop" className="d-none d-md-block mt-auto">
            <Image
              className="categoryBanner"
              src="/sliders/featured_category_image.webp"
              alt="category banner"
              height={400}
              width={500}
            />
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .categoryBannerColor {
            background-color: #f3c2cc;
          }
          .categoryBanner {
            height: 100%;
            width: 100%;
          }
          button.control {
            height: 40px;
            width: 40px;
            margin: 10px;
            border: none;
            background-color: white;
            border-radius: 50%;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          button.control:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  )
}
