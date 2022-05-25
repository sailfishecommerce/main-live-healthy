interface ProductTagsProps {
  tags: string[] | null
  tabColor: string
  vendor: string | null
  updateVendor: (tag: string) => void
}

export default function ProductTags({
  tags,
  tabColor,
  vendor,
  updateVendor,
}: ProductTagsProps) {
  const activeVendor = (tag: string) => {
    const activeVendorClass = tag === vendor ? 'active' : ''
    return activeVendorClass
  }
  return (
    <>
      <ul className="flex items-center">
        {tags?.map((tag: any) => {
          const activeVendorClass = activeVendor(tag)
          return (
            <li
              className={`${activeVendorClass} productTag mb-4 flex mr-2 items-center text-xs p-1 border  bg-white rounded-xl`}
              key={tag}
              title={tag}
            >
              <button type="button" onClick={() => updateVendor(tag)}>
                {tag}
              </button>
            </li>
          )
        })}
      </ul>
      <style jsx>
        {`
          .productTag {
            border: 1px solid ${tabColor};
            color: ${tabColor};
          }
          .productTag.active {
            border: 1px solid ${tabColor};
            background-color: ${tabColor};
            color: white;
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
