import axios from "axios";

export default function useCreateProduct() {
  function createProduct(product: any): any {
    axios
      .post("/api/create-product", { record: product })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => console.log("error", error));
  }

  return { createProduct };
}
