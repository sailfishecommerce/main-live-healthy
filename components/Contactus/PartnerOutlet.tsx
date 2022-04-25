import partnerContent from '@/json/contact-us.json'
import Icons from '@/components/Icons'

export default function PartnerOutlet() {
  return (
    <section className="container mx-auto pt-4 tablet:mt-4 mb-10">
      <h2 className="text-xl mb-0 lg:text-3xl font-medium text-center tablet:mb-3">
        Partner outlet stores
      </h2>
      <div className="flex flew-wrap w-full justify-center flex-col tablet:flex-row items-center">
        {partnerContent.outlet.map((content) => (
          <div
            key={content.address}
            className="tablet:w-1/3 w-5/6 sm:w-1/2 mx-4 my-4 tablet:my-4 shadow-md hover:shadow-lg rounded-b-lg"
          >
            <div>
              <img className="rounded-t-lg" src={content.image} alt="Orlando" />
              <div className="p-4">
                <h6 className="lg:text-lg font-base text-md">
                  {content.address}
                </h6>
                <ul className="mb-0">
                  {content.info.map((content) => (
                    <li
                      key={content.action}
                      className="flex items-center pb-3 border-b-2 border-gray-100"
                    >
                      <Icons
                        icon={content.icon}
                        className="text-red-500 mx-2"
                        size={20}
                      />
                      <div className="flex flex-col">
                        <span className="text-md">{content.action}</span>
                        {content.action === 'Find us' ? (
                          <a
                            aria-label="reach us"
                            className="text-sm tablet:text-md"
                            href="#"
                          >
                            {content.text}
                          </a>
                        ) : content.action === 'Call us' ? (
                          <a
                            aria-label="phone number"
                            className="text-sm tablet:text-md"
                            href={`tel:${content.text.replace(' ', '')}`}
                          >
                            {content.text}
                          </a>
                        ) : (
                          <a
                            aria-label="email"
                            className="text-sm tablet:text-md"
                            href={`mailto:${content.text}`}
                          >
                            {content.text}
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
