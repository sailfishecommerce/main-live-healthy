import AllCategoriesDropdown from '@/components/Dropdown/AllCategoriesDropdown'
import PageLink from '@/components/Menu/PageLink'
import HomepageSearch from '@/components/Search/HomepageSearch'
import useCategoryData from '@/hooks/useCategoryData'

export default function SecondaryMenu() {
  const [data, status] = useCategoryData()

  const categories = status === 'success' ? data?.results.slice(12, 20) : []
  return (
    <div className="md:flex lg:px-4 xl:px-0 items-center relative justify-between py-2">
      <AllCategoriesDropdown />
      <ul className="lg:flex items-center md:w-3/4 w-2/3 xl:w-4/5 justify-between">
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
      <HomepageSearch />
    </div>
  )
}
