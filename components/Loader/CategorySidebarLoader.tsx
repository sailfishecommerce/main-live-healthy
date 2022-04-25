import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export function CategorySidebarLoader(
  props: JSX.IntrinsicAttributes &
    IContentLoaderProps & { children?: React.ReactNode }
) {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={30}
      viewBox="0 0 300 30"
      backgroundColor="#b5a6a6"
      foregroundColor="#ecebeb"
      className="my-2"
      {...props}
    >
      <rect x="3" y="15" rx="3" ry="3" width="75%" height="6" />
      <circle cx="92%" cy="18" r="12" />
    </ContentLoader>
  );
}

export default function LoadCategorySidebar() {
  const numberOfCategories = new Array(5).fill(0);

  return (
    <div className="flex flex-col">
      {numberOfCategories.map((_, index) => (
        <CategorySidebarLoader key={index} />
      ))}
    </div>
  );
}
