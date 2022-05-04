import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ShippingDeliveriesPage() {
  const pageContent = JsonContent.content[3]
  return (
    <CustomercareLayout>
      <article className="w-3/4 bg-gray-100 content">
        <h1 className="text-3xl my-4 mb-8 font-light">{pageContent.title}</h1>
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
              <h5 className="font-medium text-lg my-8">{item.question}</h5>
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
