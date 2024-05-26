import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";

const Inventory = () => {
  const [productClicked, setProductClicked] = useState(false);

  return (
    <>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class={` 2xl:container animate-view-content`}>
          <div
            class={`${
              productClicked ? "opacity-40" : ""
            } font-[sans-serif] bg-gray-50 rounded-2xl pb-4 px-6 pt-6`}
          >
            <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
              <h5 class="text-xl font-bold text-gray-800 mb-12">Products</h5>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                <ProductCard view={() => setProductClicked(true)} />
                <ProductCard view={() => setProductClicked(true)} />
                <ProductCard view={() => setProductClicked(true)} />
                <ProductCard view={() => setProductClicked(true)} />
              </div>
            </div>
          </div>
        </div>{" "}
        {productClicked && (
          <div className="-mt-10">
            <ProductView close={() => setProductClicked(false)} />
          </div>
        )}
      </div>
    </>
  );
};
export default Inventory;
