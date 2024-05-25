import React from "react";

const CartItem = () => {
  return (
    <>
      <div class="flex items-start gap-4">
        <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0 bg-gray-300 rounded-md">
          <img
            src="https://readymadeui.com/images/product10.webp"
            class="w-full object-contain"
          />
        </div>
        <div class="w-full">
          <h3 class="text-base text-gray-800">Split Sneakers</h3>
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
          </ul>
        </div>
      </div>
    </>
  );
};
export default CartItem;
