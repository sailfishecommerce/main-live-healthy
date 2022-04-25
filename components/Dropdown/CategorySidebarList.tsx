import Link from "next/link";

import allCategoryContent from "@/json/allcategories-dropdown.json";
import useCategoryData from "@/hooks/useCategoryData";

type categoryType = {
  slug: string;
  name: string;
};

interface categoryProps {
  categories: Array<categoryType>;
  title: string;
  className?: string;
}

function CategoryLinks({ categories, title, className }: categoryProps) {
  const categoryLinkClassName = className ? className : "";
  return (
    <>
      <h1 className="text-xl font-bold my-2">{title}</h1>
      <ul
        className={`${categoryLinkClassName} border-gray-200 pb-2 category-list border-r mr-8 w-full`}
      >
        {categories?.map((category: categoryType, index: number) => (
          <li key={index} className="sidebar-list py-1 my-1 w-full">
            <Link href={category.slug} passHref>
              <a className="text-black">{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          .category-list {
            max-height: 200px;
            overflow-y: scroll;
          }
          .sidebar-list:hover {
            background-color: #ffe690;
          }
          .sidebar-list:hover a {
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

export default function CategorySidebarList() {
  const [data, status] = useCategoryData();

  const categories = status === "success" ? data?.results.slice(12, 20) : [];

  return (
    <div className="category-sidebar flex flex-col w-1/5">
      <CategoryLinks
        className="border-b"
        categories={categories}
        title="Categories"
      />
      <CategoryLinks categories={allCategoryContent.sidebar} title="Section" />
    </div>
  );
}
