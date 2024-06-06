import { useEffect, useState } from "react";
import {
  calculateElapsedTime,
  formatNumberWithSpace,
} from "../../../components/CommonFuncs";
import { Paid, Cancelled, Returned } from "../../Sales/CustomCells";
const Row = ({ order }) => {
  const [status, setStatus] = useState(null);
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
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:text-black hover:shadow-lg hover:border-gray-300">
          <th
            scope="row"
            class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {order.customer}
          </th>
          <td class="px-6 py-4">{status}</td>
          <td class="px-6 py-4">{order.discount}</td>
          <td class="px-6 py-4">Rs.{formatNumberWithSpace(order.total)}</td>
          <td class="px-16 py-4 text-left">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {calculateElapsedTime(order.createdAt)}
            </a>
          </td>
        </tr>
      )}
    </>
  );
};
export default Row;
