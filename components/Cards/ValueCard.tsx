import Image from 'next/image'

interface ValuecardProps {
  content: {
    icon: string
    title: string
    text: string
    color: string
    link?: string
  }
}

export default function ValueCard({ content }: ValuecardProps) {
  return (
    <>
      <div
        title={content.title}
        className="value-card px-6 justify-center w-11/12 lg:w-full rounded-3xl p-3 md:p-6 flex h-40 flex-col xl:h-48 hover:opacity-80"
      >
        <div className="w-1/6 md:w-2/12">
          <Image
            src={content.icon}
            alt={content.title}
            height={100}
            width={100}
            layout="responsive"
          />
        </div>
        <h2 className="font-medium text-lg md:text-xl my-2">{content.title}</h2>
        <p>{content.text}</p>
        {content.link && (
          <a
            href={`mailto:${content.link}`}
            className="font-bold text-sm text-blue-500 text-wrap flex-wrap"
          >
            {content.link}
          </a>
        )}
      </div>
      <style jsx>
        {`
          .value-card {
            background-color: ${content.color};
          }
        `}
      </style>
    </>
  )
}
