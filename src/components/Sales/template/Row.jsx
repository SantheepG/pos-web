import React, { useEffect, useState } from "react";
import { formatDate } from "../../CommonFuncs";
import {
  Paid,
  Returned,
  Cancelled,
} from "../../../ui-components/Sales/CustomCells";

import { formatNumberWithSpace } from "../../../components/CommonFuncs";
const Row = ({
  order,
  view,
  orderToDelete,
  setOrderToDelete,
  cancelDelete,
  proceedToDelete,
  orderToReturn,
  setOrderToReturn,
  cancelReturn,
  proceedToReturn,
}) => {
  const [status, setStatus] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [returnClicked, setRetunClicked] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [viewReturn, setViewReturn] = useState(false);

  useEffect(() => {
    if (!orderToReturn) {
      setRetunClicked(false);
    }
  }, [orderToReturn]);

  useEffect(() => {
    if (orderToDelete && orderToDelete.id === order.id) {
      setViewDelete(true);
    } else {
      setViewDelete(false);
    }
  }, [orderToDelete, order]);

  useEffect(() => {
    if (orderToReturn && orderToReturn.id === order.id) {
      setViewReturn(true);
    } else {
      setViewReturn(false);
    }
  }, [orderToReturn, order]);

  useEffect(() => {
    if (order) {
      if (order.status === "Paid") {
        setStatus(<Paid />);
      } else if (order.status === "Cancelled") {
        setStatus(<Cancelled />);
      } else if (order.status === "Returned") {
        setStatus(<Returned />);
      }
    }
  }, [order]);

  return (
    <>
      {order && (
        <tr className={`${deleteClicked || returnClicked ? "opacity-40" : ""}`}>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div class="inline-flex items-center gap-x-3">
              <span>#{order.id.slice(0, 5).toUpperCase()}</span>
            </div>
          </td>
          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {formatDate(order.createdAt)}
          </td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            {status}
          </td>
          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <div class="flex items-center gap-x-2">
              <div>
                <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                  {order.customer}
                </h2>
                {/* <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                  orlando@example.com
                </p> */}
              </div>
            </div>
            <div className="mt-2">cashier : {order.cashier}</div>
          </td>
          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            Rs.{formatNumberWithSpace(order.total)}
          </td>
          <td class="px-4 py-4 text-sm whitespace-nowrap">
            <div class="flex items-center gap-x-6">
              {!viewDelete && !viewReturn && (
                <div className="animate-slide-in-from-left space-x-2">
                  <button
                    class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                    onClick={view}
                  >
                    View
                  </button>

                  <button
                    class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                    disabled={order.status === "Returned"}
                    onClick={setOrderToReturn}
                  >
                    {order.status === "Paid" && "Return"}
                  </button>

                  <button
                    class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                    onClick={setOrderToDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      class="fill-gray-800 inline-block hover:fill-red-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 3V4H4V6H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H20V4H15V3H9ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z" />
                    </svg>
                  </button>
                </div>
              )}
              {viewDelete && !viewReturn && (
                <div className="animate-slide-in-from-right space-x-2">
                  <button
                    type="button"
                    class="text-gray-600 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:gray-600 hover:border-gray-500"
                    disabled={deleteClicked}
                    onClick={() => {
                      cancelDelete();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:red-800 hover:border-red-500"
                    disabled={deleteClicked}
                    onClick={() => {
                      setDeleteClicked(true);
                      proceedToDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
              {!viewDelete && viewReturn && (
                <div className="animate-slide-in-from-right space-x-1">
                  <button
                    type="button"
                    class="text-gray-600 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:gray-600 hover:border-gray-500"
                    disabled={returnClicked}
                    onClick={() => {
                      cancelReturn();
                    }}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    class="text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:red-800 hover:border-red-500"
                    disabled={returnClicked}
                    onClick={() => {
                      setRetunClicked(true);
                      proceedToReturn();
                    }}
                  >
                    Return order
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
export default Row;
