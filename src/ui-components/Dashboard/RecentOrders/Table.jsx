import Row from "./Row";
import { useAppContext } from "../../../AppContext";
import { useEffect, useState } from "react";
const RecentOrders = () => {
  const { sales } = useAppContext();
  const [salesArr, setSalesArr] = useState(null);

  useEffect(() => {
    if (sales) {
      let salesArray = Array.from(sales);
      let sortedOrders = [...salesArray].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSalesArr(sortedOrders);
    }
  }, [sales]);
  return (
    <>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="space-x-4 p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Recent orders{" "}
          {sales === null && (
            <svg
              aria-hidden="true"
              role="status"
              className={`w-5 h-5 mt-3 ml-4 text-cyan-200 animate-spin dark:text-gray-600`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
          )}
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-16 py-3">
              Customer
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Discount%
            </th>
            <th scope="col" class="px-6 py-3">
              Paid
            </th>
            <th scope="col" class="px-16 py-3">
              <span class="sr-only">.</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {salesArr &&
            salesArr.length > 0 &&
            salesArr
              .slice(0, 5)
              .map((order) => <Row key={order.id} order={order} />)}
          {salesArr && salesArr.length === 0 && (
            <div className="m-10 text-gray-500">Empty here</div>
          )}
        </tbody>
      </table>
    </>
  );
};
export default RecentOrders;
