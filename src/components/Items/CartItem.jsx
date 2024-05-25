import React from "react";

const CartItem = () => {
  return (
    <>
      <div class="flex items-start gap-4 border p-3 rounded-lg shadow-sm">
        <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0 bg-gray-300 rounded-md">
          <img
            src="https://readymadeui.com/images/product10.webp"
            class="w-full object-contain"
          />
        </div>
        <div class="w-full">
          <div className="flex justify-between mb-4">
            <div class="w-32 text-center overflow-hidden">
              <h3 class="text-base text-gray-800 whitespace-nowrap">
                Split Sneakers
              </h3>
            </div>
            <div className="bg-gray-100 border rounded-xl hover:bg-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 fill-current text-red-600"
                viewBox="0 0 24 24"
              >
                <path d="M18 6.343l-1.414-1.414L12 9.515 7.414 4.929 6 6.343l4.586 4.586L6 15.515l1.414 1.414L12 13.343l4.586 4.586L18 15.515l-4.586-4.586L18 6.343z" />
              </svg>
            </div>
          </div>

          <ul class="text-xs text-gray-600 space-y-1 mt-2">
            <li class="flex flex-wrap gap-4">
              Size <span class="ml-auto">37</span>
            </li>
            <li class="flex flex-wrap gap-4">
              Quantity <span class="ml-auto">2</span>
            </li>
            <li class="flex flex-wrap gap-4">
              Total Price <span class="ml-auto">$40</span>
            </li>
            <li class="flex flex-wrap gap-4 text-red-500 cursor-pointer my-4">
              <span class="ml-auto"></span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default CartItem;
