import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";
import AddProductView from "./AddProductView";
import { useAppContext } from "../../AppContext";

const Inventory = () => {
  const { items } = useAppContext();
  const [title, setTitle] = useState("All products");
  const [itemsToView, setItemsToView] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productClicked, setProductClicked] = useState(false);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (items) {
      setItemsToView(items);
      let categories = [...new Set(items.map((item) => item.category))];
      setCategories(categories);
    }
  }, [items]);
  const searchItem = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setItemsToView(items);
    } else {
      let matchedProducts = items.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setItemsToView(matchedProducts);
    }
  };
  const handleCategoryChange = (event) => {
    if (event.target.value === "all") {
      setItemsToView(items);
      setTitle("All Products");
    } else {
      setTitle(event.target.value);

      const filteredProducts = items.filter(
        (item) => item.category === event.target.value
      );

      setItemsToView(filteredProducts);
    }
  };
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
              <div class="px-10 mt-5 flex justify-between w-full">
                <div class="flex justify-between w-full pb-6">
                  <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400 w-108">
                    <span class="absolute  left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                      <svg
                        xmlns="http://ww50w3.org/2000/svg"
                        class="w-4 fill-current"
                        viewBox="0 0 35.997 36.004"
                      >
                        <path
                          id="Icon_awesome-search"
                          data-name="search"
                          d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="search"
                      name="leadingIcon"
                      id="leadingIcon"
                      placeholder="Search here"
                      class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                      onChange={(e) => searchItem(e)}
                    />
                  </div>
                  <div className="hidden lg:block md:block font-bold">
                    <h5>{title}</h5>
                  </div>
                  <div className="flex justify-between ">
                    <div
                      className="bg-gray-100 border rounded-xl hover:bg-white cursor-pointer p-2 h-10 mx-6"
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
                    <select
                      class="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200"
                      onChange={(e) => handleCategoryChange(e)}
                    >
                      <span>Category</span>
                      {/* <svg
                        class="rotate-90 group-focus:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                        />
                      </svg> */}

                      <option key="all" name="all" value="all">
                        All
                      </option>

                      {categories.length !== 0 &&
                        categories.map((category) => (
                          <option
                            class="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                            key={category}
                            name={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                {itemsToView !== null &&
                  itemsToView.length !== 0 &&
                  itemsToView.map((item) => (
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
      </div>
      {productClicked && (
        <ProductView
          item={selectedItem}
          close={() => setProductClicked(false)}
        />
      )}
      {addProductClicked && (
        <AddProductView close={() => setAddProductClicked(false)} />
      )}
    </>
  );
};
export default Inventory;
