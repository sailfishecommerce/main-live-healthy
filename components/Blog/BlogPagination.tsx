import type { PropsWithChildren } from 'react'

import Icons from '@/components/Icons'
import type { PaginationProps } from '@/typings/types'

interface Props {
  label: string
  active?: boolean
}

function PaginateLink({ children, label, active }: PropsWithChildren<Props>) {
  const activeClass = active ? 'bg-red-500 text-white' : ''
  return (
    <button
      type="button"
      aria-label={label}
      className={`${activeClass} items-center hover:bg-red-500 hover:text-white flex border-2 border-gray-100 px-2 rounded-md`}
    >
      {children}
    </button>
  )
}

export default function BlogPagination({ pagination }: PaginationProps) {
  return (
    <nav className="flex justify-between pt-2" aria-label="page-navigation">
      <PaginateLink label="prev">
        <Icons className="mr-1" icon="arrow-prev" />
        Prev
      </PaginateLink>
      <ul className="pagination flex">
        {pagination.map((paginate) =>
          paginate.active ? (
            <li key={paginate.count} aria-current="page">
              <PaginateLink active label={`page-${paginate.count}`}>
                {paginate.count}
              </PaginateLink>
            </li>
          ) : (
            <li key={paginate.count} className="mx-1 d-none d-sm-block">
              <PaginateLink label={`page-${paginate.count}`}>
                {paginate.count}
              </PaginateLink>
            </li>
          )
        )}
      </ul>
      <PaginateLink label="next">
        Next
        <Icons className="ml-1" icon="arrow-next" />
      </PaginateLink>
    </nav>
  )
}
