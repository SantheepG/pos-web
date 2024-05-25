import React from "react";

const ItemCard = () => {
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
          <img
            src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
            class="h-40 rounded-md"
            alt=""
          />
        </div>
        <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
          <div class="py-5 px-5">
            <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600 font-light">Size : Regular</div>
              <div class="text-2xl text-sky-600 font-bold">$ 8.00</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
