import { useState, useEffect, useRef } from "react";

export default function useInfiniteScroll(products: []) {
  const [productCount, setProductCount] = useState(30);
  const productView: any[] = products.slice(0, 30);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [productList, setProductList] = useState(productView);
  const loader = useRef(null);

  function handleObserver(entities: any) {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentViewIndex(productCount);
      setProductCount((productCount) => productCount + 30);
    }
  }

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "10px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    const newProductList: any[] = productList.concat(
      products.slice(currentViewIndex, productCount)
    );
    setProductList(newProductList);
  }, [productCount]);

  return {
    productList,
  };
}
