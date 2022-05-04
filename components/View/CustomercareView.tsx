interface Props {
  pageContent: {
    title: string
    texts: Array<{ question: string; answer: string }>
    'reviewed-date'?: string
  }
}
export default function CustomercareView({ pageContent }: Props) {
  return (
    <article className="w-full lg:w-3/4 bg-gray-100 content">
      <h1 className="text-xl lg:text-3xl lg:my-4 lg:mb-8 font-light">
        {pageContent.title}
      </h1>
      <hr className="border-white border-b-2 my-4" />
      {pageContent['reviewed-date'] && (
        <p>Last reviewed: {pageContent['reviewed-date']}</p>
      )}
      {pageContent.texts.map((item) => {
        return (
          <div
            key={item.question}
            className="article-text my-4 border-b-4 border-white pb-4"
          >
            <h5 className="font-medium text-lg my-2 lg:my-8">
              {item.question}
            </h5>
            <p
              className="mt-2 text-md leading-loose"
              dangerouslySetInnerHTML={{
                __html: item.answer,
              }}
            />
          </div>
        )
      })}
    </article>
  )
}
