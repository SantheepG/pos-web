import React, { useEffect, useState } from "react";
import { formatNumberWithSpace } from "../../CommonFuncs";

const ItemCard = ({ cart, item, addToCart }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    console.log(cart);
    let d = cart.filter((cartitem) => cartitem.id === item.id);
    setAdded(d.length > 0 ? true : false);
  }, [cart, item]);
  return (
    <>
      {/* <div class="">
        <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-6 max-w-xs">
          <img
            class="mb-3 w-36 h-36 rounded-full shadow-lg mx-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Hamburger_%2812164386105%29.jpg/1200px-Hamburger_%2812164386105%29.jpg"
            alt="product"
          />
          <h1 class="text-lg text-gray-700"> Burger </h1>
          <h3 class="text-sm text-gray-400 "> Bun </h3>
          <p class="text-xs text-gray-400 mt-4"> </p>
          <button class="bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-2 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
            Add to cart
          </button>
        </div>
      </div> */}
      <div class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center">
        <div class="bg-white rounded-lg mt-5">
          <img src={item.thumbnail} class="w-36 h-36 rounded-full " alt="" />
        </div>
        <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
          <div class="py-5 px-5">
            <span class="font-bold text-gray-800 text-lg ">{item.name}</span>
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600 font-light overflow-hidden">
                {item.category} |{" "}
                <span
                  className={`${
                    item.stock < 5 ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {item.stock} left
                </span>
              </div>
              {
                <button
                  disabled={item.stock === 0 || added}
                  className={`${
                    (item.stock === 0 || added) && "opacity-40"
                  } bg-gray-100 border rounded-xl hover:bg-white cursor-pointer p-2 my-2`}
                  onClick={() => {
                    addToCart();
                  }}
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
                </button>
              }
            </div>
            <div class="text-lg text-sky-600 font-bold">
              Rs.{formatNumberWithSpace(item.price)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
