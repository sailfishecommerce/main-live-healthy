/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import dashboardSidebarContent from '@/json/dashboard-sidebar.json'

type contentType = {
  name: string
  link: string
  icon: string
  count?: number
}

export default function DashboardSidebar() {
  return (
    <aside className="col-lg-4 pt-4 pt-lg-0 pe-xl-5">
      <div className="bg-white rounded-3 shadow-lg pt-1 mb-5 mb-lg-0">
        <div className="d-mflex justify-between items-center text-center text-md-start p-4">
          <div className="d-mflex items-center">
            <div className="dashboardImg img-thumbnail rounded-circle position-relative flex-shrink-0 mx-auto mb-2 mx-md-0 mb-md-0">
              <span
                className="badge bg-warning position-absolute end-0 mt-n2"
                data-bs-toggle="tooltip"
                title="Reward points"
              >
                384
              </span>
              <img
                className="rounded-circle"
                src="/img/shop/account/avatar.jpg"
                alt="Susan Gardner"
              />
            </div>
            <div className="ps-md-3">
              <h3 className="fs-base mb-0">Susan Gardner</h3>
              <span className="text-accent fs-sm">s.gardner@example.com</span>
            </div>
          </div>
          <a
            className="btn btn-primary d-lg-none mb-2 mt-3 mt-md-0"
            href="#account-menu"
            data-bs-toggle="collapse"
            aria-label="account menu"
            aria-expanded="false"
          >
            <i className="ci-menu mx-2"></i>Account menu
          </a>
        </div>
        <div className="d-lg-block collapse" id="account-menu">
          {dashboardSidebarContent.map((sidebarContent) => (
            <div key={sidebarContent.name} className="flex flex-col">
              <div className="bg-secondary px-4 py-3">
                <h3 className="fs-sm mb-0 text-gray-500">
                  {sidebarContent.name}
                </h3>
              </div>
              <ul className="list-unstyled mb-0">
                {sidebarContent.content.map((content: contentType) => (
                  <li key={content.name} className="border-b-4 mb-0">
                    <Link passHref href={content.link}>
                      <a
                        aria-label={content.name}
                        className="nav-link-style flex items-center px-4 py-3"
                      >
                        <i className={` ${content.icon} opacity-60 mx-2`}></i>
                        {content.name}
                        <span className="fs-sm text-gray-500 ms-auto">
                          {content?.count}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .dashboardImg {
            width: 6.375rem;
          }
        `}
      </style>
    </aside>
  )
}
