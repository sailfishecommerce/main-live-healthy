import { useState } from "react";

export default function useFilter() {
  const [filter, setFilter] = useState({
    price: [],
    color: null,
    size: null,
  });

  function onChangeFilter(e: any) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  return {
    filter,
    onChangeFilter,
  };
}
