import React from "react";

import { useDispatch } from "react-redux";
import { setClicked } from "../../redux/action";

const Notify = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setClicked("inventoryClicked", true));
  };

  return (
    <React.Fragment>
      <a
        href="#"
        class="flex py-3 transition-all duration-300 ease-in-out px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        onClick={handleClick}
      >
        <div class="flex-shrink-0">
          <img
            class="w-11 h-11 rounded-full"
            src={item.thumbnail}
            alt="image"
            // onError={(e) => {
            //   e.target.src = defaultImg;
            // }}
          />
          <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2C9.447 2 9 2.447 9 3V12C9 12.553 9.447 13 10 13C10.553 13 11 12.553 11 12V3C11 2.447 10.553 2 10 2ZM10 15C9.447 15 9 15.447 9 16C9 16.553 9.447 17 10 17C10.553 17 11 16.553 11 16C11 15.447 10.553 15 10 15Z" />
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">
              {item.name}
            </span>{" "}
            :{" "}
            <span class="font-medium text-gray-900 dark:text-white">
              Out of stock. Click to restock
            </span>{" "}
            <a href="" className="text-blue-500"></a>
          </div>
          <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
            {/* {alert.created_at !== null &&
              calculateElapsedTime(alert.created_at)} */}
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};
export default Notify;
