import React from "react";

const ItemCard = () => {
  return (
    <>
      <div class="">
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
      </div>
    </>
  );
};
export default ItemCard;
