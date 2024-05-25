import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";

const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };
  return (
    <>
      <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
            Dashboard
          </h5>
          <button class="w-12 h-16 -mr-2 border-r lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 my-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="flex space-x-4">
            <button
              aria-label="search"
              class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
            >
              <svg
                xmlns="http://ww50w3.org/2000/svg"
                class="w-4 mx-auto fill-current text-gray-600"
                viewBox="0 0 35.997 36.004"
              >
                <path
                  id="Icon_awesome-search"
                  data-name="search"
                  d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                ></path>
              </svg>
            </button>
            <button
              aria-label="chat"
              class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="space-y-5 lg:hidden mx-8 my-4">
        <div class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
          <ul class="flex items-center gap-2 text-sm font-medium overflow-x-auto whitespace-nowrap">
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.dashboardClicked ? "bg-white" : "bg-gray-100"
                } text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                Dashboard
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.categoryClicked ? "bg-white" : "bg-gray-100"
                } text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("categoryClicked")}
              >
                Categories
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.itemsClicked ? "bg-white" : "bg-gray-100"
                } text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("itemsClicked")}
              >
                Items
                <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                  {" "}
                  8{" "}
                </span>
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.salesClicked ? "bg-white" : "bg-gray-100"
                } text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("salesClicked")}
              >
                Sales
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
