import CategorySidebarList from '@/components/Dropdown/CategorySidebarList'
import Whatsapp from '@/components/Icons/Whatsapp'
import PageLink from '@/components/Menu/PageLink'
import TrendingLinkSlider from '@/components/Slider/TrendingLinkSlider'
import menu from '@/json/menu.json'

export default function MobileMenuView() {
  return (
    <>
      <div className="fixed z-30 bg-white pl-4 mobileslidemenu flex flex-col">
        <ul className="flex items-center my-4">
          {menu.primaryMenu.map((item) => (
            <PageLink menuItem={item} key={item.slug} />
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
        <CategorySidebarList />
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