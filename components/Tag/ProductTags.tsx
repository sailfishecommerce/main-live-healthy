export default function ProductTags({ tags, tabColor }: any) {
  return (
    <>
      <ul className="flex items-center">
        {tags.map((tag: any) => (
          <li
            className="productTag mb-4 flex mr-2 items-center text-xs p-1 border  bg-white rounded-xl"
            key={tag}
            title={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          .productTag {
            border: 1px solid ${tabColor};
            color: ${tabColor};
          }
          .productTag:hover {
            background-color: ${tabColor};
            color: white;
          }
        `}
      </style>
    </>
  )
}
