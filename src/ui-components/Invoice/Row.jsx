import { formatNumberWithSpace } from "../../components/CommonFuncs";
const Row = ({ item }) => {
  return (
    <>
      {item && (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white w-64 whitespace-normal break-words"
          >
            {item.name}
          </th>
          <td class="px-6 py-4">Rs.{formatNumberWithSpace(item.price)}</td>
          <td class="px-6 py-4">{item.qty}</td>
          <td class="px-6 py-4">
            Rs.{formatNumberWithSpace(item.qty * item.price)}
          </td>
        </tr>
      )}
    </>
  );
};
export default Row;
