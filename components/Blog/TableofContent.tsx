/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */

export default function TableofContent({ blogPost }: any) {
  function getSubtopics() {
    const subtopicArray: any = []
    blogPost.content.blocks?.map((postBlock: any) => {
      if (postBlock.type.includes('header-')) {
        if (postBlock.text.length > 0) {
          const formattedText = postBlock.text.includes('\n')
            ? postBlock.text.split('\n')[0]
            : postBlock.text
          subtopicArray.push(formattedText)
        }
      }
    })
    return subtopicArray
  }

  const subTopics = getSubtopics()
  return (
    <div className="border rounded-lg p-6 flex flex-col">
      <h3 className="font-bold">Table Of Content</h3>
      <hr className="my-4" />
      <div className="content">
        <h5 className="font-bold text-base">{blogPost.title}</h5>
        <ul>
          {subTopics.map((subTopic: string, index: number) => (
            <li className="text-sm font-semibold ml-3" key={index}>
              {subTopic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
