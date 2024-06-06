import Row from "./Row";
import { useAppContext } from "../../../AppContext";
const RecentOrders = () => {
  const { sales } = useAppContext();
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
              Subtotal
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
          {sales &&
            sales.length > 0 &&
            sales
              .slice(0, 5)
              .map((order) => <Row key={order.id} order={order} />)}
        </tbody>
      </table>
    </>
  );
};
export default RecentOrders;
