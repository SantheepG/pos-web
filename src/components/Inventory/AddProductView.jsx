import React, { useState, useEffect, useRef } from "react";
import { imgFormats } from "../../App";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useAppContext } from "../../AppContext";
import { productSchema } from "../../validations";

const AddProductView = ({ close }) => {
  const { fetchData } = useAppContext();
  const [viewDropdown, setViewDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [url, setUrl] = useState("");
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [errorAlert, setErrorAlert] = useState({});

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (imgFormats.includes(fileExtension)) {
      setThumbnail(selectedFile);

      const img = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      });

      img.then((result) => {
        setThumbnailPreview(result);
      });
    } else {
      alert("Invalid image");
    }
  };

  // const handleUpload = () => {
  //   setAddProductClicked(true);

  //   const storageRef = ref(storage, `productImgs/${thumbnail.name}`);
  //   uploadBytes(storageRef, thumbnail)
  //     .then((snapshot) => {
  //       console.log("Uploaded a blob or file!", snapshot);
  //       return getDownloadURL(snapshot.ref);
  //     })
  //     .then((downloadURL) => {
  //       addItem(downloadURL);
  //       console.log("File available at", downloadURL);
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file:", error);
  //     });
  // };

  const handleUpload = async () => {
    setAddProductClicked(true);
    try {
      await productSchema.validate(
        {
          name: name,
          category: category,
          stock: stock,
          price: price,
          thumbnail: thumbnail,
        },
        { abortEarly: false }
      );
      const storageRef = ref(storage, `productImgs/${thumbnail.name}`);
      const snapshot = await uploadBytes(storageRef, thumbnail);
      console.log("Uploaded a blob or file!", snapshot);

      const downloadURL = await getDownloadURL(snapshot.ref);
      addItem(downloadURL);
      console.log("File available at", downloadURL);
    } catch (error) {
      setAddProductClicked(false);
      if (error.name === "ValidationError") {
        error.inner.forEach((error) => {
          setErrorAlert((prevState) => ({
            ...prevState,
            [error.path]: error.message,
          }));
        });
      }
      setTimeout(() => {
        setErrorAlert({});
      }, 5000);
      console.error("Error uploading file:", error);
    }
  };

  const addItem = async (url) => {
    try {
      console.log(url);
      // Add user data to Firestore
      // await setDoc(doc(db, "products", name), {
      //   name: name,
      //   category: category,
      //   price: price,
      //   qty: qty,
      //   thumbnail: url,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // });
      await addDoc(collection(db, "products"), {
        name: name,
        category: category,
        price: price,
        stock: stock,
        thumbnail: url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setAddProductClicked(false);
      alert("Item added");
      fetchData();
      close();
    } catch (error) {
      alert(error.message);
      console.log(name, category, price, stock, url);
      setAddProductClicked(false);
    }
  };

  return (
    <>
      <div class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4">
        <div className="block bg-white z-50 border-1 rounded-xl p-4  shadow-md border-t-2">
          <div className="flex justify-end mx-8 my-2" onClick={close}>
            <div className="bg-gray-100 hover:bg-white cursor-pointer rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 fill-current text-red-600"
                viewBox="0 0 24 24"
              >
                <path d="M18 6.343l-1.414-1.414L12 9.515 7.414 4.929 6 6.343l4.586 4.586L6 15.515l1.414 1.414L12 13.343l4.586 4.586L18 15.515l-4.586-4.586L18 6.343z" />
              </svg>
            </div>
          </div>
          <div class="max-w-lg mx-auto my-2 bg-white rounded-lg p-1">
            <img
              class="w-32 h-32 rounded-full mx-auto border-2"
              src={thumbnailPreview}
              alt="thumbnail"
            />
            <span className="absolute animate-view-content text-xs text-red-500  text-center w-full -ml-10 mt-1">
              {errorAlert && errorAlert.hasOwnProperty("thumbnail") && (
                <span className="animate-view-content">
                  {errorAlert["thumbnail"]}
                </span>
              )}
            </span>
            <div className="flex justify-center my-8 ml-40">
              <input
                type="file"
                ref={fileInputRef}
                className="whitespace-nowrap w-64 overflow-hidden"
                // style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {/* <div class="flex justify-center mt-5">
        <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
          Twitter
        </a>
        <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
          LinkedIn
        </a>
        <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
          GitHub
        </a>
      </div> */}
            <div class="mt-2">
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name<span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder=""
                      required=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                      {errorAlert && errorAlert.hasOwnProperty("name") && (
                        <span className="animate-view-content">
                          {errorAlert["name"]}
                        </span>
                      )}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category<span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      class={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder=""
                      required=""
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                      {errorAlert && errorAlert.hasOwnProperty("category") && (
                        <span className="animate-view-content">
                          {errorAlert["category"]}
                        </span>
                      )}
                    </span>

                    {/* <button
                      id="dropdownSearchButton"
                      data-dropdown-toggle="dropdownSearch"
                      data-dropdown-placement="bottom"
                      class="text-black bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={() => setViewDropdown(!viewDropdown)}
                    >
                      Select category
                      <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    <div
                      id="dropdownSearch"
                      className={`absolute z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 ${
                        viewDropdown ? "" : "hidden"
                      }`}
                    >
                      <ul
                        class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownSearchButton"
                      >
                        <li class="mt-2">
                          <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id="checkbox-item-11"
                              type="checkbox"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              // onChange={(e) => {
                              //   setaddAdminData({
                              //     ...addAdminData,
                              //     roles: {
                              //       ...addAdminData.roles,
                              //       Dashboard: e.target.checked,
                              //     },
                              //   });
                              // }}
                            />
                            <label
                              for="checkbox-item-11"
                              class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              Dashboard
                            </label>
                          </div>
                        </li>
                        <li class="">
                          <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id="checkbox-item-12"
                              type="checkbox"
                              // onChange={(e) => {
                              //   setaddAdminData({
                              //     ...addAdminData,
                              //     roles: {
                              //       ...addAdminData.roles,
                              //       ManageUsers: e.target.checked,
                              //     },
                              //   });
                              // }}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="checkbox-item-12"
                              class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              Manage Users
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price<span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      class={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="Rs."
                      required=""
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                      {errorAlert && errorAlert.hasOwnProperty("price") && (
                        <span className="animate-view-content">
                          {errorAlert["price"]}
                        </span>
                      )}
                    </span>
                  </div>{" "}
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="quantity"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quantity<span className="text-red-600"> *</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      class={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder=""
                      required=""
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(parseInt(e.target.value))}
                    />
                    <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                      {errorAlert && errorAlert.hasOwnProperty("stock") && (
                        <span className="animate-view-content">
                          {errorAlert["stock"]}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center w-full space-x-2">
            <button
              data-modal-toggle="createProductModal"
              type="button"
              class="justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              // onClick={() => {
              //   resetStates();
              //   closeModal();
              // }}
              onClick={close}
            >
              <svg
                class="mr-1 -ml-1 w-5 h-5"
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
              Discard
            </button>
            <button
              type="button"
              class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={handleUpload}
            >
              {addProductClicked && (
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
              {addProductClicked ? "Please wait" : "Add item"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProductView;
