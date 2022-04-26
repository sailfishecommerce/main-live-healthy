import Whatsapp from '@/components/Icons/Whatsapp'
import CategoryLinks from '@/components/Menu/CategoryLinks'
import PageLink from '@/components/Menu/PageLink'
import TrendingLinkSlider from '@/components/Slider/TrendingLinkSlider'
import useCategoryData from '@/hooks/useCategoryData'
import allCategoryContent from '@/json/allcategories-dropdown.json'
import menu from '@/json/menu.json'

export default function MobileSlideMenu() {
  const [data, status] = useCategoryData()

  const categories = status === 'success' ? data?.results.slice(12, 20) : []

  return (
    <>
      <div className="fixed z-30 bg-white pl-4 mobileslidemenu flex flex-col">
        <ul className="flex items-center my-4">
          {menu.primaryMenu.map((item, index) => (
            <PageLink menuItem={item} key={index} />
          ))}
        </ul>
        <div className="contacts px-2 flex border-b mb-6 md:pr-4 pr-0">
          <div className="reach-us border rounded-md p-4 mb-4">
            <div className="flex items-center">
              <Whatsapp />
              <span className="font-medium ml-4">Call us: 9442 2060</span>
            </div>
            <hr className="w-full border-b border-gray-100 my-4" />
            <p className="text-sm">
              Opening Hours: Mon - Sat: 9:00 am - 6:00 pm
            </p>
          </div>
        </div>
        <TrendingLinkSlider />
        <div className="links">
          <CategoryLinks title="Categories" linkArray={categories} />
          <CategoryLinks
            title="Sections"
            linkArray={allCategoryContent.sidebar}
          />
        </div>
      </div>
      <style jsx>
        {`
          .links {
            max-height: 44vh;
            overflow-y: scroll;
          }
          .mobileslidemenu {
            height: 100%;
          }
        `}
      </style>
    </>
  )
}
