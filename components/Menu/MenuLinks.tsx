import Whatsapp from '@/components/Icons/Whatsapp'
import PageLink from '@/components/Menu/PageLink'
import menuLinks from '@/json/menu.json'

export default function MenuLinks() {
  return (
    <div className="menuLinks w-3/4 flex items-center justify-between">
      <div className="md:flex items-center w-1/3 2xl:text-lg lg:text-md">
        <Whatsapp />
        <span className="font-bold text-green-500 mx-1">Whatsapp:</span>
        9449 2060
      </div>
      <ul className="lg:flex items-center justify-between w-3/5">
        {menuLinks.primaryMenu.map((menuItem) => (
          <PageLink
            className=" lg:text-md 2xl:text-lg font-normal"
            key={menuItem.name}
            menuItem={menuItem}
          />
        ))}
      </ul>
    </div>
  )
}
