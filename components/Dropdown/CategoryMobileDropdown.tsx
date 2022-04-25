/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import Link from 'next/link'

import useCategoryData from '@/hooks/useCategoryData'
import useMarketplaceCategory from '@/hooks/useMarketplaceCategory'

export default function CategoryMobileDropdown() {
  const [categories, status] = useCategoryData()
  const selectedFooterCategory = useMarketplaceCategory()
  const livehealthyCategories = (category: []) => category.slice(12)

  return (
    <ul className="dropdown-menu flex flex-col">
      {status === 'error'
        ? 'unable to load collections'
        : status === 'loading'
        ? 'loading collections'
        : livehealthyCategories(categories.results).map((category: any) => (
            <li key={category.name} className="p-2 border-b">
              <Link passHref href={`/collections/${category.slug}`}>
                <a
                  aria-label={category.name}
                  onClick={() => selectedFooterCategory(category.name)}
                >
                  {category.name}
                </a>
              </Link>
            </li>
          ))}
    </ul>
  )
}
