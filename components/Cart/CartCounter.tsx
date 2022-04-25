import { useState, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateProduct } from "@/redux/product-slice";

interface SelectInputProps {
  options: {
    attributeId: string;
    name: string;
    values: { name: string; id: string }[];
  };
}
export function SelectInput({ options }: SelectInputProps) {
  return (
    <div className="selectInput items-center">
      <label
        className="mr-2 font-medium text-gray-500 text-lg"
        htmlFor={options.attributeId}
      >
        {options.name} :
      </label>
      <select
        id={options.attributeId}
        className="border border-gray-200 rounded-lg hover:border-red-500 focus:border-red-600 w-32 p-2 bg-white"
      >
        {options.values.map((item) => (
          <option className="p-2" value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CartCounter({ counterType }: any) {
  const [itemQty, setItemQty] = useState(1);
  const [selectedQty, setSelectedQty] = useState(null);

  function selectedQuantityHandler(e: any) {
    setSelectedQty(e.target.value);
  }

  function updateCounter(type: "increment" | "decrement") {
    if (type === "increment") {
      setItemQty(itemQty + 1);
    } else if (type === "decrement" && itemQty > 1) {
      setItemQty(itemQty - 1);
    }
  }

  function onSubmitHandler(e: any) {
    e.preventDefault();
  }

  const optionsClassName = counterType?.box
    ? "mb-3 align-items-end"
    : "mb-3 items-center";
  return (
    <form onSubmit={onSubmitHandler}>
      {selectedQty && (
        <div className="alert bg-danger text-white">
          {selectedQty} cartons has a total of {Number(selectedQty) * 10} boxes
          with 100 pcs each
        </div>
      )}
      <div className={`cartCounter row pe-3 ${optionsClassName}`}>
        {counterType?.box ? (
          <div className="flex flex-col w-50">
            <label htmlFor="selectProductQuantity">Carton</label>
            <select
              name="quantity"
              className="form-select"
              id="selectProductQuantity"
              onChange={selectedQuantityHandler}
              required
            >
              <option value="">Select Quantity</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        ) : (
          <div className="cartCounter w-50 flex items-center mb-0">
            <button
              onClick={() => updateCounter("decrement")}
              type="button"
              aria-label="Remove Item"
              className="p-2 flex items-center justify-content-center btn btn-danger text-white"
            >
              <i className="fas fa-minus mb-0"></i>
            </button>
            <input
              className="w-25 mx-2 text-center border"
              readOnly
              value={itemQty}
            />
            <button
              onClick={() => updateCounter("increment")}
              type="button"
              aria-label="Add Item"
              className={`p-2 flex items-center justify-content-center btn btn-success text-white`}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        )}
        <button
          className="submitBtn btn btn-primary btn-shadow d-block w-50"
          type="submit"
          aria-label="Add to Cart"
        >
          <i className="ci-cart fs-lg mx-2"></i>
          Add to Cart
        </button>
      </div>
      <style jsx>
        {`
          .submitBtn {
            height: 43px;
          }
        `}
      </style>
    </form>
  );
}

type selectType = { name: string; id: string };
interface SelectProductOptionProps {
  product: {
    options: {
      id: string;
      name: string;
      values: selectType[];
    }[];
  };
}
export function SelectProductOption({ product }: SelectProductOptionProps) {
  const dispatch = useAppDispatch();
  const { productSpec }: any = useAppSelector((state) => state.product);

  function selectHandler(e: any) {
    return dispatch(
      updateProduct({
        ...productSpec,
        [e.target.name]: { name: e.target.name, value: e.target.value },
      })
    );
  }

  return (
    <div>
      <span className="flex items-center text-base font-medium my-3">
        <h3 className="text-gray-800 text-lg mr-2">Color:</h3>
        <h3 className="text-gray-400 text-lg">Red/Dark blue/White</h3>
      </span>
      <div className="product-color-type"></div>
      {product.options && (
        <div className="product-details flex items-center justify-between">
          {product.options.map((option: any) => (
            <div key={option.id} className="selectInput items-center">
              <label
                className="mr-2 font-medium text-gray-500 text-lg"
                htmlFor={option.attributeId}
              >
                {option.name} :
              </label>
              <select
                id={option.attributeId}
                name={option.name}
                onClick={selectHandler}
                className="border border-gray-200 rounded-lg hover:border-red-500 focus:border-red-600 w-32 p-2 bg-white"
              >
                <option value="">Select {option.name.toLowerCase()}</option>
                {option.values.map((item: selectType) => (
                  <option className="p-2" value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SearchInput() {
  const svgStyle: any = useMemo(
    () => ({ enableBackground: "new 0 0 56.966 56.966" }),
    []
  );
  return (
    <div className="flex relative border border-gray-200 rounded-md my-1 mx-auto max-w-md">
      <input
        className="border-1 border-gray-400 bg-red transition h-10 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
        type="search"
        name="search"
        placeholder="Search"
      />
      <button aria-label="search" type="submit" className="absolute right-2 top-3 mr-4">
        <svg
          className="text-black h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style={svgStyle}
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  );
}
