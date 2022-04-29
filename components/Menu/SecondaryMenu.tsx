import AllCategoriesDropdown from '@/components/Dropdown/AllCategoriesDropdown'
import PageLink from '@/components/Menu/PageLink'
import Searchbar from '@/components/Search/Searchbar'
import useCategoryData from '@/hooks/useCategoryData'

export default function SecondaryMenu() {
  const [data, status] = useCategoryData()

  const categories = status === 'success' ? data?.results.slice(12, 20) : []
  return (
    <div className="md:flex items-center justify-between py-2">
      <AllCategoriesDropdown />
      <ul className="lg:flex items-center w-2/3 justify-between">
        {categories.length > 1
          ? categories.map((menuItem: { slug: string; name: string }) => (
              <PageLink
                key={menuItem.slug}
                menuItem={menuItem}
                link="collection"
                className="font-semibold hover:text-green-500 lg:text-md 2xl:text-lg"
              />
            ))
          : null}
      </ul>
      <Searchbar />
    </div>
  )
}
