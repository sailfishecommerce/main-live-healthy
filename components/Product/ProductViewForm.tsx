import { memo, useCallback } from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

import { ProductProps } from "@/types";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import useShoppingCart from "@/hooks/useShoppingCart";
import useProductOptions from "@/hooks/useProductOptions";
import useEvent from "@/hooks/useEvent";
import { useAppDispatch } from "@/redux/store";
import { quickViewModal } from "@/redux/ui-slice";

function ProductViewFormComonent({
  product,
  algoliaEvent,
  forCategory,
}: ProductProps) {
  const { optionHandler } = useProductOptions();
  const categoryStyle = forCategory ? "flex flex-col" : "flex";
  const { productAddedToCart, convertedItemAfterSearch } = useAlgoliaEvents();
  const dispatch = useAppDispatch();

  const { algoliaQuickViewEvent } = useEvent();
  const formOptionBg = useCallback((name: string) => {
    const style = { backgroundColor: name.toLowerCase() };
    return style;
  }, []);

  const { addItemToCart, loadingState } = useShoppingCart();

  const quickViewHandler = () => {
    dispatch(quickViewModal(product));
    // if (algoliaEvent === "search") {
    //   convertedItemAfterSearch("quick_view_after_search", product.__queryID, [
    //     product.objectID,
    //   ]);
    // } else {
    //   algoliaQuickViewEvent(product);
    // }
  };

  function onSubmitHandler(e: any) {
    e.preventDefault();
    addItemToCart.mutate({ product, quantity: 1 });
    if (algoliaEvent === "search") {
      convertedItemAfterSearch(
        "product_added_to_cart_after_search",
        product.__queryID,
        [product.objectID]
      );
    } else {
      productAddedToCart([product.id]);
    }
  }

  loadingState(addItemToCart, `${product.name} added to cart`);

  return (
    <div className="card-body card-body-hidden">
      <form onSubmit={onSubmitHandler} className="flex justify-center">
        {product?.options?.length > 0 ? (
          product?.options?.map((option) => {
            return option.name === "Color" ? (
              <div key={option.id} className="text-center pb-2">
                {option.values.map((value: { name: string; id: string }) => (
                  <div
                    key={value.id}
                    className="form-check form-option form-check-inline mb-2"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      value={value.name}
                      onChange={optionHandler}
                      name={option.name}
                      id={value.id}
                      required
                    />
                    <label
                      className="form-option-label rounded-circle"
                      htmlFor={value.id}
                    >
                      <span
                        className="form-option-color rounded-circle"
                        style={formOptionBg(value.name)}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
            ) : option.name === "Size" ? (
              <div key={option.id} className={`mb-2 ${categoryStyle}`}>
                <select
                  onChange={optionHandler}
                  name="Size"
                  className="form-select form-select-sm mx-2 mb-2"
                  required
                >
                  <option value="">Select Size</option>
                  {option.values.map((value: { name: string; id: string }) => (
                    <option value={value.name} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
                <button
                  aria-label="Add to Cart"
                  className="text-sm flex items-center bg-red-500 hover:bg-red-400 text-white rounded-lg p-2 m-1"
                  type="submit"
                >
                  <BsCart4 className="mr-1" />
                  Add to Cart
                </button>
              </div>
            ) : null;
          })
        ) : (
          <button
            aria-label="Add to Cart"
            className="bg-red-500 flex items-center hover:bg-red-400 text-white rounded-lg p-2 m-1 text-sm"
            type="submit"
          >
            <BsCart4 className="mr-1" />
            Add to Cart
          </button>
        )}
      </form>
      <div className="text-center">
        <button
          aria-label="Product Quick View"
          className="hover:text-red-500 text-sm flex items-center my-2"
          onClick={quickViewHandler}
          data-bs-toggle="quickViewModal"
        >
          <AiOutlineEye className="mr-1" />
          Quick view
        </button>
      </div>
    </div>
  );
}

const ProductViewForm = memo(ProductViewFormComonent);
export default ProductViewForm;
