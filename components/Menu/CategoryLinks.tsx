import Link from 'next/link'

interface Props {
  title: string
  linkArray: Array<{ slug?: string; name: string }>
}

export default function CategoryLinks({ title, linkArray }: Props) {
  return (
    <div className="categoryLinks mt-4 md:mt-0">
      <h1 className="text-lg font-bold md:hidden">{title}</h1>
      <ul className="category-list border-r md:mr-8 md:w-full">
        {linkArray.map((item) => {
          return item.slug ? (
            <li
              key={item.slug}
              className="sidebar-list py-1 md:p-2 my-1 md:my-2 w-full"
            >
              <Link passHref href={item.slug}>
                <a className="text-black">{item.name}</a>
              </Link>
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
