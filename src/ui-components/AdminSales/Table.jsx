import Row from "./Row";
import { useAppContext } from "../../AppContext";

const Table = () => {
  const { adminSales } = useAppContext();
  return (
    <>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Discount%
              </th>
              <th scope="col" class="px-6 py-3">
                Paid (Rs)
              </th>
            </tr>
          </thead>
          <tbody>
            {adminSales &&
              adminSales.length > 0 &&
              adminSales.map((order) => <Row key={order.id} order={order} />)}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
