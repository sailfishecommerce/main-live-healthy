import { BsFillArrowRightCircleFill } from 'react-icons/bs'

import Icons from '@/components/Icons'

interface ContactCardWithAnchorProps {
  content: { text: string; icon: string; title: string; anchor: string }
}
interface ContactCardProps {
  content: { text: string; icon: string; title: string }
}

export function ContactCardWithAnchor({ content }: ContactCardWithAnchorProps) {
  return (
    <div
      key={content.icon}
      className="md:w-1/3 w-5/6 hover:bg-gray-200 mx-auto my-4 items-center border-2 border-gray-100 mx-2 p-6 rounded-md h-52 flex justify-center"
    >
      <a
        aria-label={content.title}
        className="card flex flex-col"
        href={content.anchor}
      >
        <div className="card-body text-center">
          <Icons
            icon={content.icon}
            className="text-center text-red-500 flex m-auto"
            size={24}
          />
          <h3 className="text-xl mb-2">{content.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content.text }} />
          <div className="text-md  mt-2 hover:text-red-500 flex items-center justify-center">
            Click to see map
            <BsFillArrowRightCircleFill className="mx-2" />
          </div>
        </div>
      </a>
    </div>
  )
}

export function ContactCard({ content }: ContactCardProps) {
  return (
    <div
      key={content.icon}
      className="md:w-1/3 w-5/6 hover:bg-gray-200 mx-auto border-2 my-4 border-gray-100 mx-2 p-6 flex justify-center items-center rounded-md h-52"
    >
      <div className="card flex flex-col">
        <div className="card-body text-center">
          <Icons
            icon={content.icon}
            className="text-center text-red-500 flex m-auto"
            size={24}
          />
          <h3 className="text-xl mb-3">{content.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content.text }} />
        </div>
      </div>
    </div>
  )
}
