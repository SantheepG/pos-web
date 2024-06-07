import React, { useEffect, useState, useRef } from "react";
import Row from "./Row";
import { useAppContext } from "../../../AppContext";
import { db } from "../../../FirebaseConfig";
import { doc, deleteDoc, setDoc, writeBatch, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import InvoiceTemplate from "../../../ui-components/Invoice/InvoiceTemplate";

const SalesTemplate = () => {
  const invoiceRef = useRef();
  const { sales, refetchSales, refetchItems } = useAppContext();
  const [ordersToView, setOrdersToView] = useState(null);
  const [salesArray, setSalesArray] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToReturn, setOrderToReturn] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(false);
  const [downloadInvoice, setDownloadInvoice] = useState(false);

  useEffect(() => {
    if (downloadInvoice) {
      setTimeout(() => {
        setDownloadInvoice(false);
      }, 5000);
    }
  }, [downloadInvoice]);

  useEffect(() => {
    if (sales) {
      let salesArray = Array.from(sales);
      let sortedOrders = [...salesArray].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSalesArray(sortedOrders);
      setOrdersToView(sortedOrders);
    }
  }, [sales]);
  const searchItem = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setOrdersToView(salesArray);
    } else {
      let matchedProducts = salesArray.filter(
        (item) =>
          item.customer.toLowerCase().includes(inputValue) ||
          item.id.toLowerCase().includes(inputValue)
      );
      setOrdersToView(matchedProducts);
    }
  };
  const handleSort = (event) => {
    if (event.target.value === "Recent") {
      let sortedOrders = [...salesArray].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrdersToView(sortedOrders);
    } else if (event.target.value === "Earliest") {
      let sortedOrders = [...salesArray].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setOrdersToView(sortedOrders);
    }
  };
  const handleDeleteOrder = async () => {
    try {
      await deleteDoc(doc(db, "sales", orderToDelete.id));
      refetchSales();
      setOrderToDelete(null);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const handleReturnOrder = async () => {
    try {
      await setDoc(doc(db, "sales", orderToReturn.id), {
        cashier: orderToReturn.cashier,
        createdAt: orderToReturn.createdAt,
        customer: orderToReturn.customer,
        discount: orderToReturn.discount,
        items: orderToReturn.items,
        status: "Returned",
        subtotal: orderToReturn.subtotal,
        total: orderToReturn.total,
        updatedAt: new Date().toISOString(),
      });

      refetchSales();
      changeStockMultiple(orderToReturn.items);
    } catch (error) {
      toast.error("Something went wrong. Please try again");

      console.log(error.message);
    }
  };

  const changeStockMultiple = async (cart) => {
    const batch = writeBatch(db);

    try {
      // Create an array of promises for fetching document snapshots
      const promises = cart.map(async (item) => {
        const itemRef = doc(db, "products", item.id);
        const itemSnapshot = await getDoc(itemRef);
        return { item, itemRef, itemSnapshot };
      });

      // Resolve all promises
      const results = await Promise.all(promises);

      // Add batch operations
      results.forEach(({ item, itemRef, itemSnapshot }) => {
        if (itemSnapshot.exists()) {
          const currentStock = itemSnapshot.data().stock || 0;
          batch.set(
            itemRef,
            {
              stock: currentStock + item.qty,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } else {
          console.log(
            `Item with id ${item.id} does not exist in the database.`
          );
        }
      });

      // Commit the batch
      await batch.commit();
      setOrderToReturn(null);
      refetchItems();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="px-6 pt-6 2xl:container animate-view-content">
          <section
            class={`${viewInvoice ? "opacity-40" : ""} container px-4 mx-auto`}
          >
            <div class="flex flex-col">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <div className="flex justify-between pt-6 pr-4">
                      <h5 class="text-xl font-bold text-gray-800 my-2 mb-6 mx-6">
                        Sales history
                      </h5>
                      {sales === null && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className={`w-6 h-6 mt-3 text-cyan-200 animate-spin dark:text-gray-600`}
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
                      <div class="relative inline-block text-left">
                        <select
                          class="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200"
                          onChange={handleSort}
                        >
                          <svg
                            class="rotate-90 group-focus:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                            />
                          </svg>
                          <option key="Recent" value="Recent">
                            Recent
                          </option>
                          <option key="Earliest" value="Earliest">
                            Earliest
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="relative w-72 mx-6 mb-6 flex items-center text-gray-400 focus-within:text-cyan-400 w-108">
                      <span class="absolute  left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                        <svg
                          xmlns="http://ww50w3.org/2000/svg"
                          class="w-4 fill-current"
                          viewBox="0 0 35.997 36.004"
                        >
                          <path
                            id="Icon_awesome-search"
                            data-name="search"
                            d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="search"
                        name="leadingIcon"
                        id="leadingIcon"
                        placeholder="Enter Ref IDs or Customer names"
                        class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                        onChange={(e) => searchItem(e)}
                      />
                    </div>
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div class="flex items-center gap-x-3">
                              <button class="flex items-center gap-x-2">
                                <span>Invoice</span>

                                <svg
                                  class="h-3"
                                  viewBox="0 0 10 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="0.1"
                                  />
                                  <path
                                    d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="0.1"
                                  />
                                  <path
                                    d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="0.3"
                                  />
                                </svg>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Date
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Customer
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Paid amount
                          </th>

                          <th scope="col" class="relative py-3.5 px-4">
                            <span class="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {ordersToView &&
                          ordersToView.length !== 0 &&
                          ordersToView.map((order) => (
                            <Row
                              key={order.id}
                              order={order}
                              orderToDelete={orderToDelete}
                              orderToReturn={orderToReturn}
                              view={() => {
                                setCurrentOrder(order);
                                setViewInvoice(true);
                              }}
                              setOrderToDelete={() => {
                                setOrderToDelete(order);
                              }}
                              setOrderToReturn={() => {
                                setOrderToReturn(order);
                              }}
                              cancelDelete={() => setOrderToDelete(null)}
                              cancelReturn={() => setOrderToReturn(null)}
                              proceedToDelete={() => handleDeleteOrder()}
                              proceedToReturn={() => handleReturnOrder()}
                            />
                          ))}
                        {ordersToView && ordersToView.length === 0 && (
                          <tr>
                            <td className="py-6 px-6 text-gray-500">
                              Empty here
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
        </div>
      </div>
      {viewInvoice && currentOrder !== null && (
        <div className="h-screen-full overflow-y-auto">
          <div class="invoice fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4">
            <div className="animate-view-content h-[80vh] overflow-y-auto block bg-white z-100 border-1 rounded-xl p-4 shadow-md border-t-2">
              <div className="flex justify-end w-full mb-4">
                <div
                  className="bg-gray-100 hover:bg-white cursor-pointer rounded-lg mr-4 px-2 text-blue-500"
                  onClick={() => setDownloadInvoice(true)}
                >
                  Download
                </div>
                <div
                  className="bg-gray-100 hover:bg-white cursor-pointer rounded-lg"
                  onClick={() => setViewInvoice(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 fill-current text-red-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6.343l-1.414-1.414L12 9.515 7.414 4.929 6 6.343l4.586 4.586L6 15.515l1.414 1.414L12 13.343l4.586 4.586L18 15.515l-4.586-4.586L18 6.343z" />
                  </svg>
                </div>
              </div>
              <InvoiceTemplate
                order={currentOrder}
                placed={false}
                downloadInvoice={downloadInvoice}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SalesTemplate;
