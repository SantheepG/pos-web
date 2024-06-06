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
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Recent orders
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
