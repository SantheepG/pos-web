import {
  formatDate,
  formatNumberWithSpace,
} from "../../components/CommonFuncs";

import { useDispatch } from "react-redux";
import { setClicked } from "../../redux/action";
const Row = ({ order }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setClicked("salesClicked", true));
  };
  return (
    <>
      {order && (
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer  hover:text-gray-800"
          onClick={handleClick}
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {order.customer}
          </th>
          <td class="px-6 py-4">{formatDate(order.createdAt)}</td>
          <td class="px-6 py-4">{order.discount}</td>
          <td class="px-6 py-4">{formatNumberWithSpace(order.total)}</td>
        </tr>
      )}
    </>
  );
};
export default Row;
