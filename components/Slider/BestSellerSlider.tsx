import { Splide, SplideSlide } from "@splidejs/react-splide";

import Product from "@/components/Cards/ProductCard";
import useLiveHealthyProduct from "@/hooks/useLivehealthyProduct";
import "@splidejs/splide/dist/css/splide.min.css";
import selectRandomColor from "@/lib/selectRandomColor";

export default function BestSellerSlider() {
  const [data, status] = useLiveHealthyProduct();

  return (
    <section className="itemSlider best-seller-slider py-4 px-4 md:py-8 relative w-full bg-gray-platinum mx-auto flex relative z-10 flex-col my-4">
      <div className="w-full">
        <div className="mx-auto container top md:mb-8 flex items-center justify-between">
          <h1 className="font-bold text-xl md:text-3xl">Best Sellers</h1>
        </div>

        <div className="2xl:pl-28 pl-0 products mx-auto mt-4 flex items-center justify-between pb-0 md:pb-12">
          {status === "error" ? (
            "unable to load products"
          ) : status === "loading" ? (
            "loading"
          ) : (
            <Splide
              options={{
                perPage: 5,
                padding: "5rem",
                breakpoints: {
                  500: {
                    perPage: 2,
                    padding: "1rem",
                  },
                  800: {
                    perPage: 2,
                  },
                  1200: {
                    perPage: 3,
                  },
                },
              }}
              className="w-full mx-auto bestsellerSplide"
            >
              {data.map((product: any) => (
                <SplideSlide key={product.id}>
                  <Product
                    className="md:mr-8 mr-4 bg-white rounded-xl relative z-20"
                    color={selectRandomColor()}
                    product={product}
                    imageClassName="border-gray-300 pb-4 mb-4 border-b"
                  />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
      </div>
    </section>
  );
}
