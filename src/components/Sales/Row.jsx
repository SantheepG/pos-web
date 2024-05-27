import React from "react";
const Row = () => {
  return (
    <>
      <tr>
        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
          <div class="inline-flex items-center gap-x-3">
            <input
              type="checkbox"
              class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
            />

            <span>#3062</span>
          </div>
        </td>
        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          Jan 4, 2022
        </td>
        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div class="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                stroke="#667085"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <h2 class="text-sm font-normal">Refunded</h2>
          </div>
        </td>
        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <div class="flex items-center gap-x-2">
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                Orlando Diggs
              </h2>
              <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                orlando@example.com
              </p>
            </div>
          </div>
          <div className="mt-2">cashier: davin</div>
        </td>
        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          2000
        </td>
        <td class="px-4 py-4 text-sm whitespace-nowrap">
          <div class="flex items-center gap-x-6">
            <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
              Archive
            </button>

            <button class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
              Download
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default Row;
