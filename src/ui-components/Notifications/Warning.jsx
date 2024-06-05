import React from "react";

import { useDispatch } from "react-redux";
import { setClicked } from "../../redux/action";

const Warning = ({ item }) => {
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
          <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-400 rounded-full border border-white dark:border-gray-700">
            <svg
              class="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div class="text-gray-800 font-normal text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">
              {item.name} :
            </span>{" "}
            Only {item.stock} left. Tap to restock
            <span class="font-medium text-primary-700 dark:text-primary-500"></span>{" "}
          </div>
          <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
            {/* {alert.event_datetime !== null &&
              calculateElapsedTime(alert.created_at)} */}
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};
export default Warning;
