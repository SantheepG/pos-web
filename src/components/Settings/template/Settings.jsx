import React, { useEffect, useState } from "react";
import avatar from "../../../assets/default-avatar.png";
import { useAppContext } from "../../../AppContext";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userUpdateSchema } from "../../../validations";
import AdminSales from "./AdminSales";
import Footer from "..//../../ui-components/Footer";
import { emailSchema } from "../../../validations";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../../FirebaseConfig";

const SettingsTemplate = () => {
  const { admin, adminSales, refetchUsers } = useAppContext();
  const [sales, setSales] = useState([]);
  const [editClicked, setEditClicked] = useState(false);
  const [pwdClicked, setPwdClicked] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorAlert, setErrorAlert] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminSales) {
      setSales(Array.from(adminSales));
    }
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setPhone(admin.phone);
    }
  }, [adminSales]);

  const updateInfo = async () => {
    setUpdateClicked(true);
    try {
      await userUpdateSchema.validate(
        {
          name: name,
          phone: phone,
          email: email,
        },
        { abortEarly: false }
      );
      await setDoc(doc(db, "users", admin.id), {
        name: name,
        phone: phone,
        email: email,
        createdAt: admin.createdAt,
        uid: admin.uid,
      });
      window.location.reload();
      setUpdateClicked(false);
      setEditClicked(false);
      refetchUsers();
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((error) => {
          setErrorAlert((prevState) => ({
            ...prevState,
            [error.path]: error.message,
          }));
        });
      } else {
        toast.error("Something went wrong. Please try again");
      }
      setTimeout(() => {
        setErrorAlert({});
      }, 5000);

      console.log(error.message);
      setUpdateClicked(false);
    }
  };
  const resetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await emailSchema.validate(
        {
          email: email,
        },
        { abortEarly: false }
      );
      await sendPasswordResetEmail(auth, email);

      toast("Password reset email sent! Please check your inbox.");
      setLoading(false);
      setPwdClicked(false);
    } catch (error) {
      setLoading(false);
      setPwdClicked(false);

      if (error.name === "ValidationError") {
        error.inner.forEach((error) => {
          setErrorAlert((prevState) => ({
            ...prevState,
            [error.path]: error.message,
          }));
        });
      } else {
        toast.error("Invalid email");
      }
      setTimeout(() => {
        setErrorAlert({});
      }, 3000);
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="px-6 pt-6 2xl:container animate-view-content">
          <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
            <div class="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
              <div class="flex items-center px-6 lg:hidden">
                <div class="flex-grow flex-no-shrink py-6">
                  <div class="mt-8 text-center">
                    <img
                      src={avatar}
                      alt=""
                      class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                    />
                    <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                      {admin && admin.name}
                    </h5>
                    <span class="hidden text-gray-400 lg:block">Admin</span>
                  </div>
                </div>
                <div class="flex-shrink w-32 inline-block relative">
                  <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="hidden lg:flex">
                <div class="w-1/3 text-center py-4">
                  <div class="flex justify-center border-r">
                    <div class="text-center">
                      <img
                        src={avatar}
                        alt=""
                        class="w-8 h-8 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                      />
                    </div>
                    <div className="my-10 mx-6 font-semibold">
                      {admin && admin.name}
                    </div>
                  </div>
                </div>
                <div class="w-1/3 text-center py-8">
                  <div class="border-r">
                    <div class="text-grey-darker mb-2">
                      <span class="text-lg align-top">
                        <span class="text-green align-top font-semibold">
                          Email
                        </span>
                      </span>
                    </div>
                    <div class="text-sm uppercase text-grey tracking-wide ">
                      {admin && admin.email}
                    </div>
                  </div>
                </div>
                <div class="w-1/3 text-center py-8">
                  <div class="">
                    <div class="text-grey-darker mb-2">
                      <span class="text-lg align-top">
                        <span class="text-green align-top font-semibold">
                          Phone number
                        </span>
                      </span>
                    </div>
                    <div class="text-sm uppercase text-grey tracking-wide">
                      {admin && admin.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-4">
              <div class="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
                <div
                  class={`${
                    updateClicked ? "opacity-40" : ""
                  } flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden`}
                >
                  <div class="border-b">
                    <div class="flex justify-between px-6 -mb-px">
                      <h3 class="text-blue-dark py-4 font-normal text-lg">
                        Your details
                      </h3>
                      <div class="flex">
                        {!editClicked ? (
                          <button
                            type="button"
                            class="animate-view-content py-4 text-grey-dark border-b border-transparent hover:border-grey-dark hover:text-orange-500 "
                            onClick={() => setEditClicked(true)}
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            {" "}
                            <button
                              type="button"
                              class="animate-view-content mx-4 rounded-lg my-4 px-2 text-grey-300 text-sm   hover:text-orange-500 "
                              onClick={() => setEditClicked(false)}
                            >
                              Cancel
                            </button>{" "}
                            <button
                              type="button"
                              class="animate-view-content my-4 px-2 rounded-lg text-grey-300 text-sm hover:border-grey-dark hover:text-cyan-500 "
                              onClick={updateInfo}
                            >
                              Update
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow flex px-6 py-6 text-grey-darker items-center justify-between border-b px-24">
                    <div className="font-semibold">Name </div>

                    {!editClicked ? (
                      <div>{admin && admin.name}</div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class={`animate-view-content shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                    )}
                  </div>
                  <div class="flex-grow flex px-6 py-6 text-grey-darker items-center justify-between border-b px-24">
                    <div className="font-semibold">Email </div>
                    {!editClicked ? (
                      <div>{admin && admin.email}</div>
                    ) : (
                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          class={`animate-view-content shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder=""
                          required=""
                          value={email}
                          disabled
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                          {errorAlert && errorAlert.hasOwnProperty("email") && (
                            <span className="animate-view-content">
                              {errorAlert["email"]}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>{" "}
                  <div class="flex-grow flex px-6 py-6 text-grey-darker items-center justify-between border-b px-24">
                    <div className="font-semibold">Phone </div>

                    {!editClicked ? (
                      <div>{admin && admin.phone}</div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          class={`animate-view-content shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder=""
                          required=""
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                          {errorAlert && errorAlert.hasOwnProperty("phone") && (
                            <span className="animate-view-content">
                              {errorAlert["phone"]}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>{" "}
                  <div class="px-6 py-4">
                    {!editClicked &&
                      (!pwdClicked ? (
                        <div
                          class="animate-view-content text-center  text-orange-600 cursor-pointer hover:text-orange-500"
                          onClick={() => setPwdClicked(true)}
                        >
                          Change password
                        </div>
                      ) : (
                        <div
                          class={`${
                            loading ? "opacity-40" : ""
                          } animate-view-content flex justify-between text-center text-grey-500 mx-2`}
                        >
                          <div className="my-4 animate-view-content">
                            {" "}
                            Are you sure you want to reset password?
                          </div>
                          <div className="flex justify-between">
                            {" "}
                            <button
                              type="button"
                              class="animate-view-content mx-4 rounded-lg my-4 px-2 text-orange-600 text-sm hover:text-orange-500 "
                              onClick={() => setPwdClicked(false)}
                              disabled={loading}
                            >
                              Cancel
                            </button>{" "}
                            <button
                              type="button"
                              class="animate-view-content my-4 px-2 rounded-lg text-orange-600 text-sm hover:border-grey-dark hover:text-orange-500  "
                              disabled={loading}
                              onClick={resetPassword}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <AdminSales />
            </div>
          </div>
          <div class="bg-white border-t">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsTemplate;
