import {
  calculateElapsedTime,
  formatNumberWithSpace,
} from "../../../components/CommonFuncs";
const Row = ({ order }) => {
  return (
    <>
      {order && (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:text-black">
          <th
            scope="row"
            class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {order.customer}
          </th>
          <td class="px-6 py-4">Rs.{formatNumberWithSpace(order.subtotal)}</td>
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
