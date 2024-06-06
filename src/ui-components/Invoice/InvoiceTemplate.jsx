import React, { useEffect, useRef } from "react";
import logo from "../../assets/images.png";
import {
  formatDate,
  formatNumberWithSpace,
} from "../../components/CommonFuncs";
import Row from "./Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2pdf from "html2pdf.js";
const InvoiceTemplate = ({ order, placed, downloadInvoice }) => {
  const invoiceRef = useRef();

  useEffect(() => {
    if (placed) {
      toast.success("Order recorded");
    }
  }, [placed, order]);

  useEffect(() => {
    const handleDownloadInvoice = () => {
      const content = invoiceRef.current;
      if (content) {
        html2pdf()
          .from(content)
          .set({
            margin: 10,
            filename: "invoice.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .save();
      }
    };

    if (downloadInvoice) {
      setTimeout(handleDownloadInvoice, 500);
    }
  }, [downloadInvoice]);

  return (
    <React.Fragment>
      <ToastContainer />
      {order && order !== undefined && (
        <div
          ref={invoiceRef}
          class="invoice relative overflow-x-auto shadow-md sm:rounded-lg "
        >
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Shop name
              <div class="w-6/12 h-6/12 overflow-hidden aspect-w-16 aspect-h-8 md:mb-2 mb-4 my-4">
                <img src={logo} alt="User" class="h-12 w-12 object-contain" />
              </div>
              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                {order.id && "Reference ID :"}{" "}
                {order.id && order.id.slice(0, 5).toUpperCase()}
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
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white w-64 whitespace-normal break-words"
                ></th>
                <td class="px-6 py-4"></td>
                <td class="px-6 py-4">Subtotal</td>
                <td class="px-6 py-4">
                  Rs.{formatNumberWithSpace(order.subtotal)}
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white w-64 whitespace-normal break-words"
                ></th>
                <td class="px-6 py-4"></td>
                <td class="px-6 py-4">Discount%</td>
                <td class="px-6 py-4 ">{order.discount}%</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white w-64 whitespace-normal break-words"
                ></th>
                <td class="px-6 py-4"></td>
                <td class="px-6 py-4 font-semibold">Total</td>
                <td class="px-6 py-4 font-semibold">
                  Rs.{formatNumberWithSpace(order.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};
export default InvoiceTemplate;
