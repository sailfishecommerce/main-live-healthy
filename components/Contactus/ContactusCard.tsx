import { BsFillArrowRightCircleFill } from 'react-icons/bs'

import Icons from '@/components/Icons'
import type { contactInfoType } from '@/types'

interface ContactCardWithAnchorProps {
  content: contactInfoType
}

interface ContactCardProps {
  content: contactInfoType
}

export function ContactCardWithAnchor({ content }: ContactCardWithAnchorProps) {
  return (
    <div
      key={content.icon}
      className="md:w-1/3 w-5/6 mx-auto my-4 items-center border-2 border-gray-100 mx-2 p-6 rounded-md h-52 flex justify-center"
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
          {content.group.map((item) => (
            <p key={item.text} className="text-sm text-gray-500">
              {item.text}
            </p>
          ))}
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
      className="md:w-1/3 w-5/6 mx-auto border-2 my-4 border-gray-100 mx-2 p-6 flex justify-center items-center rounded-md h-52"
    >
      <div className="card flex flex-col">
        <div className="card-body text-center">
          <Icons
            icon={content.icon}
            className="text-center text-red-500 flex m-auto"
            size={24}
          />
          <h3 className="text-xl mb-3">{content.title}</h3>
          <ul className="text-md text-gray-500 mb-0">
            {content.type !== 'email' &&
              content.group.map((item) => (
                <li key={item.text}>
                  <span className="text-gray-600">{item.text} </span>
                  {item.value && content.type === 'phone' && (
                    <a
                      aria-label="phone number"
                      className="mx-1"
                      href={`"tel:${item.phone}`}
                    >
                      {item.value}
                    </a>
                  )}
                </li>
              ))}

            {content.type === 'email' &&
              content.group.map((item) => (
                <li key={item.text}>
                  <span className="text-gray-600">{item.text}:</span>
                  <a
                    aria-label="email"
                    className="mx-1"
                    href={`mailto:${item.value}`}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
