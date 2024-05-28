import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";
import AddProductView from "./AddProductView";
import { useAppContext } from "../../AppContext";

const Inventory = () => {
  const { items } = useAppContext();
  const [productClicked, setProductClicked] = useState(false);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class={` 2xl:container animate-view-content`}>
          <div
            class={`${
              productClicked || addProductClicked ? "opacity-40" : ""
            } font-[sans-serif] bg-gray-50 rounded-2xl pb-4 px-6 pt-6`}
          >
            <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
              <div className="flex justify-between pt-6 pr-4 mx-12">
                <h5 class="text-xl font-bold text-gray-800 mb-12">Inventory</h5>
                <div
                  className="bg-gray-100 border rounded-xl hover:bg-white cursor-pointer p-2 h-10"
                  onClick={() => setAddProductClicked(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 fill-current text-green-600"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2v20M2 12h20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                {items !== null &&
                  items.length !== 0 &&
                  items.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      view={() => {
                        setProductClicked(true);
                        setSelectedItem(item);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>{" "}
        {productClicked && (
          <div className="">
            <ProductView
              item={selectedItem}
              close={() => setProductClicked(false)}
            />
          </div>
        )}
        {addProductClicked && (
          <div className="">
            <AddProductView close={() => setAddProductClicked(false)} />
          </div>
        )}
      </div>
    </>
  );
};
export default Inventory;
