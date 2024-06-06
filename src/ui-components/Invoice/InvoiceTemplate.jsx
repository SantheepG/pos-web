import { useEffect } from "react";
import logo from "../../assets/images.png";
import {
  formatDate,
  formatNumberWithSpace,
} from "../../components/CommonFuncs";
import Row from "./Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const InvoiceTemplate = ({ order, placed }) => {
  useEffect(() => {
    if (placed) {
      toast.success("Order recorded");
    }
  }, [placed, order]);
  return (
    <>
      {order && order !== undefined && (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <ToastContainer />

          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Shop name
              <div class="w-6/12 h-6/12 overflow-hidden aspect-w-16 aspect-h-8 md:mb-2 mb-4 my-4">
                <img src={logo} alt="User" class="h-12 w-12 object-contain" />
              </div>
              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Reference ID : {order.id && order.id.slice(0, 5).toUpperCase()}
              </p>
              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Customer name : {order.customer}
              </p>
              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Cashier : {order.cashier}
              </p>
              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Date : {formatDate(order.createdAt)}
              </p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Qty
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from(order.items).length !== 0 &&
                Array.from(order.items).map((item) => (
                  <Row key={item.id} item={item} />
                ))}
            </tbody>
          </table>
          <div className="flex justify-end w-full">
            <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Subtotal
                  </th>
                  <td class="px-6 py-2 text-end">
                    Rs.{formatNumberWithSpace(order.subtotal)}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Discount%
                  </th>
                  <td class="px-6 py-2 text-end">{order.discount}%</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-bold">
                  <th
                    scope="row"
                    class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total
                  </th>
                  <td class="px-6 py-4 text-end">
                    Rs.{formatNumberWithSpace(order.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default InvoiceTemplate;
