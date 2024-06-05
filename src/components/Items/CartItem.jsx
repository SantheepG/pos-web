import React, { useState } from "react";
import { formatNumberWithSpace } from "../CommonFuncs";

const CartItem = ({ item, remove, increase, decrease }) => {
  return (
    <>
      <div
        class={`flex items-start gap-4 border p-3 rounded-lg shadow-sm animate-slide-in-from-left`}
      >
        <div class="w-24 h-16 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0 rounded-md">
          <img
            src={item.thumbnail}
            class="w-24 h-24  object-contain rounded-lg"
          />
        </div>
        <div class="w-full">
          <div className="flex justify-between mb-4">
            <div class="w-32 text-center overflow-hidden">
              <h3 class="text-base text-gray-800 whitespace-nowrap">
                {item.name}
              </h3>
            </div>
            <div
              className="bg-gray-100 border rounded-xl hover:bg-white cursor-pointer"
              onClick={remove}
            >
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
              Category <span class="ml-auto">{item.category}</span>
            </li>
            <li class="flex flex-wrap gap-4">
              Price{" "}
              <span class="ml-auto">
                Rs.{formatNumberWithSpace(item.price)}
              </span>
            </li>
            <li class="flex flex-wrap gap-4 font-bold">
              Total Price{" "}
              <span class="ml-auto">
                Rs.{formatNumberWithSpace(item.price * item.qty)}
              </span>
            </li>
            <li class="flex flex-wrap gap-6">
              <span className="mt-2">Quantity </span>
              <span class="ml-auto">
                <div class="relative flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    onClick={decrease}
                  >
                    <svg
                      class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                    placeholder=""
                    value={item.qty}
                    min={1}
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    onClick={increase}
                  >
                    <svg
                      class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default CartItem;
