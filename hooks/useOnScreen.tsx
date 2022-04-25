/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, MutableRefObject } from "react";

type refType = MutableRefObject<any>;

export default function useOnScreen(ref:any) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
