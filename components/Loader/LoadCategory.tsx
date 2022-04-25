import { useMemo } from "react";
import ContentLoader from "react-content-loader";

export function CategoryLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: "100%" }), []);

  return (
    <div className="px-2">
      <ContentLoader
        speed={2}
        viewBox="0 0 70 70"
        style={loaderStyle}
        backgroundColor="#e3d9d9"
        foregroundColor="#ada4a4"
        title="loading category..."
        animate
        {...props}
      >
        <rect x="0%" y="5%" rx="3" ry="3" width="20%" height="7%" />
        <rect x="88%" y="0%" rx="100" ry="100" width="12%" height="12%" />
        <rect x="0" y="15%" rx="0" ry="0" width="100%" height="50%" />
        <rect x="0" y="70%" rx="0" ry="0" width="100%" height="5%" />
        <rect x="0" y="80%" rx="0" ry="0" width="100%" height="5%" />
      </ContentLoader>
    </div>
  );
}

interface LoadCategoryProps {
  arrayType: number;
  gridStyle: string;
}
export default function LoadCategory({
  arrayType,
  gridStyle,
}: LoadCategoryProps) {
  const categoryArray = new Array(arrayType).fill(0);

  return (
    <div className="flex">
      {categoryArray.map((_, index: number) => (
        <div key={index} className={gridStyle}>
          <CategoryLoader />
        </div>
      ))}
    </div>
  );
}
