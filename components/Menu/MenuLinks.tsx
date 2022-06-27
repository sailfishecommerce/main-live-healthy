import Whatsapp from '@/components/Icons/Whatsapp'
import PageLink from '@/components/Menu/PageLink'
import menuLinks from '@/json/menu.json'

export default function MenuLinks() {
  return (
    <div className="menuLinks w-3/4 flex items-center justify-between">
      <div className="md:hidden lg:flex  items-center w-1/2 2xl:text-lg lg:text-md">
        <Whatsapp />
        <span className="font-bold text-green-500 md:text-xs mx-1">
          Whatsapp:
        </span>
        <a className="hover:text-red-500 md:text-xs" href="tel:+85370735393">
          +853 7073 5292
        </a>
      </div>
      <ul className="md:flex lg:flex items-center justify-between w-3/5 md:w-full">
        {menuLinks.primaryMenu.map((menuItem) => (
          <PageLink
            className="lg:text-md 2xl:text-lg font-normal"
            key={menuItem.name}
            menuItem={menuItem}
          />
        ))}
      </ul>
    </div>
  )
}
