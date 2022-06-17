import { FaTimes } from 'react-icons/fa'

import CategorySidebarList from '@/components/Dropdown/CategorySidebarList'
import Whatsapp from '@/components/Icons/Whatsapp'
import PageLink from '@/components/Menu/PageLink'
import TrendingLinkSlider from '@/components/Slider/TrendingLinkSlider'
import useNav from '@/hooks/useNav'
import menu from '@/json/menu.json'

export default function MobileMenuView() {
  const { toggleMobileMenu } = useNav()
  return (
    <>
      <div className="bg-white pl-4 mobileslidemenu flex flex-col">
        <button
          type="button"
          className="closeButton flex justify-end mr-4 mb-2"
          onClick={toggleMobileMenu}
        >
          <FaTimes size={22} />
        </button>
        <ul className="flex md:items-start justify-between w-80  items-center ml-0 pl-0 lg:my-4 my-2">
          {menu.primaryMenu.map((item) => (
            <PageLink
              menuItem={item}
              key={item.slug}
              className="font-semibold md:text-lg"
            />
          ))}
        </ul>
        <div className="contacts md:mx-0 mx-aut px-2 flex border-b lg:mb-6 my-2 md:pr-4 pr-0">
          <div className="reach-us border rounded-md p-4 mb-4">
            <div className="flex items-center">
              <Whatsapp />
              <span className="font-medium ml-4">
                Call us:{' '}
                <a className="hover:text-red-500" href="tel:+85370735393">
                  +853 7073 5292
                </a>
              </span>
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
          button.closeButton {
            width: 30px;
            height: 30px;
            position: absolute;
            right: 2px;
            top: 5px;
            border: 1px solid black;
            display: flex;
            align-items: center;
            margin: auto;
            justify-content: center;
            border-radius: 50%;
            z-index: 100;
          }

          .mobileslidemenu {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
