/* eslint-disable no-nested-ternary */
import PageLink from '@/components/Menu/PageLink'
import { useMediaQuery } from '@/hooks'
import useCategoryData from '@/hooks/useCategoryData'

export default function SecondaryMenuLinks() {
  const [data, status] = useCategoryData()
  const mediaQuery = useMediaQuery('(max-width:1280px) and (min-width:1025px)')
  const mediumScreen = useMediaQuery('(max-width:1024px) and (min-width:768px)')
  const sliceCategory = mediaQuery
    ? { min: 12, max: 19 }
    : mediumScreen
    ? { min: 12, max: 17 }
    : { min: 12, max: 20 }

  const categories =
    status === 'success'
      ? data?.results.slice(sliceCategory.min, sliceCategory.max)
      : []

  return (
    <ul className="md:flex items-center md:w-3/5 lg:w-4/5 w-2/3 xl:w-4/5 justify-between">
      {categories.length > 1
        ? categories.map((menuItem: { slug: string; name: string }) => (
            <PageLink
              key={menuItem.slug}
              menuItem={menuItem}
              link="collection"
              className="font-semibold hover:text-green-500 lg:text-md xl:text-base"
            />
          ))
        : null}
    </ul>
  )
}
