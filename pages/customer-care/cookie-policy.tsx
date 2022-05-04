import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function CookiePolicy() {
  const pageContent = JsonContent.content[0]
  return (
    <CustomercareLayout>
      <article className="w-3/4 bg-gray-100 content">
        <h1 className="text-2xl font-light">{pageContent.title}</h1>
        <hr className="bg-white my-4" />
        <p>Last reviewed: {pageContent['reviewed-date']}</p>
        {pageContent.texts.map((item) => {
          return (
            <div key={item.question} className="article-text my-4">
              <h5 className="font-bold text-lg mb-2">{item.question}</h5>
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
    </CustomercareLayout>
  )
}
