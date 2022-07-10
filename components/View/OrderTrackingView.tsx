import Link from 'next/link'

import contentData from '@/json/order-tracking.json'
import expectedOrderDate from '@/lib/formatOrderDate'

export default function OrderTrackingView() {
  contentData.group1[2].text = expectedOrderDate()

  return (
    <div className="container py-5 mb-2 mb-md-3">
      <div className="flex items-center mx-auto justify-center mb-4">
        {contentData.group1.map((content) => (
          <div key={content.title} className="mx-2">
            <div className="bg-gray-100 h-100 p-6 text-center rounded-md">
              <span className="font-bold text-dark mx-2">{content.title}:</span>
              {content.text}
            </div>
          </div>
        ))}
      </div>
      <ul className="flex items-center justify-center shadow-lg w-2/3 border rounded-xl mx-auto mt-8">
        {contentData.group2.map((content) => (
          <li key={content.icon} className="nav-item">
            <div className="nav-link p-8 completed">
              <div className="flex items-center">
                <div className="media-tab-media">
                  <i className={content.icon}></i>
                </div>
                <div className="ps-3">
                  <div className="media-tab-subtitle text-gray-500 fs-xs mb-1">
                    {content.step}
                  </div>
                  <h6 className="font-medium text-lg">{content.text}</h6>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap justify-between mt-6 items-center text-center pt-4">
        <div />
        <Link passHref href="/account">
          <a
            aria-label="continue shopping"
            className="bg-mountain-green text-white p-3 px-4 rounded-xl"
          >
            View account details
          </a>
        </Link>
      </div>
    </div>
  )
}
