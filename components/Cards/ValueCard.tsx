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
        className="value-card w-11/12 md:w-full rounded-3xl p-6 flex flex-col h-48 hover:opacity-80"
      >
        <div className="w-2/12">
          <Image
            src={content.icon}
            alt={content.title}
            height={100}
            width={100}
            layout="responsive"
          />
        </div>
        <h2 className="font-medium text-xl my-2">{content.title}</h2>
        <p>{content.text}</p>
        {<span className="font-bold text-blue-500">{content?.link}</span>}
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
