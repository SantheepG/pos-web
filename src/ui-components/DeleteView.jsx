import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage, db } from "../FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DeleteView = ({ close, item, deleted }) => {
  const [deleteClicked, setDeleteClicked] = useState(false);

  const deleteImage = async (imageUrl) => {
    setDeleteClicked(true);
    try {
      if (item.thumbnail === null) {
        // addItem(url);
        deleteItem(item.id);
      } else {
        // Extract the file path from the URL
        const storageRef = ref(storage, imageUrl);

        // Delete the file
        await deleteObject(storageRef);
        deleteItem(item.id);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");

      console.error("Error deleting file:", error);
      setDeleteClicked(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      // Delete the document
      await deleteDoc(docRef);

      setDeleteClicked(false);
      toast.success("Deleted successfully");
      setTimeout(() => {
        deleted();
      }, 3000);
    } catch (error) {
      alert(error.message);
      setDeleteClicked(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="delete-modal" tabindex="-1" className="animate-view-content">
        <div class="relative w-full h-auto max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="delete-modal"
              //   onClick={() => {
              //     setOverlayClicked(!overlayClicked);
              //     setdeleteProductClicked(!deleteProductClicked);
              //   }}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button> */}
            <div class="p-6 text-center">
              {/* <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to still delete this item?
              </h3>
              <button
                data-modal-toggle="delete-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={close}
                // onClick={() => {
                //   setOverlayClicked(!overlayClicked);
                //   setdeleteProductClicked(!deleteProductClicked);
                // }}
              >
                cancel
              </button>{" "}
              <button
                data-modal-toggle="delete-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 px-6 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  deleteImage(item.thumbnail);
                }}
              >
                {deleteClicked && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className={`w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600`}
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
                {deleteClicked ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteView;
