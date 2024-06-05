import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Notifications from "./Notifications";
import { useAppContext } from "../../AppContext";

const Navbar = () => {
  const { alerts } = useAppContext();
  const navigate = useNavigate();
  const [newNotification, setNewNotification] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setNewNotification(true);
    }
  }, [alerts, navigate]);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.reload();
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div class="sticky z-10 top-0 h-16 border-b shadow-sm bg-white lg:py-2.5 lg:px-16">
        <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
            <label class="mr-2">
              <span className="text-gray-500 mx-0.5">POS</span>
              <span className="text-cyan-500">tre</span>
            </label>
          </h5>
          <button class="w-12 h-16 -mr-2 border-r lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 my-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="flex space-x-4">
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              class={`${
                newNotification ? "border-b-2 border-orange-400" : "border"
              } p-2 mr-1 text-gray-500 transition-all duration-300 ease-in-out  rounded-xl bg-gray-100 hover:text-gray-900 hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
              onClick={() => {
                setNotificationsClicked(true);
                setNewNotification(false);
              }}
            >
              <span class="sr-only">View notifications</span>
              <svg
                className={`${
                  newNotification ? "text-orange-400 " : ""
                } w-5 h-5`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              {/* {newNotification && (
                <div class="absolute mx-1.5 my-0.5 h-1.5 w-2 rounded-full bg-orange-400 me-2"></div>
              )} */}
            </button>
            <button
              aria-label="chat"
              class="transition-all duration-300 ease-in-out w-28 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 hover:bg-white"
              onClick={logOut}
            >
              <span className="flex pl-4">
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="space-y-5 lg:hidden mx-8 my-4">
        <div class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
          <ul class="flex items-center gap-2 text-sm font-medium overflow-x-auto whitespace-nowrap">
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.dashboardClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                Dashboard
              </a>
            </li>

            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.itemsClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("itemsClicked")}
              >
                Items
                {/* <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                  {" "}
                  8{" "}
                </span> */}
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.inventoryClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("inventoryClicked")}
              >
                Inventory
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.salesClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("salesClicked")}
              >
                Sales
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.usersClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("usersClicked")}
              >
                Users
              </a>
            </li>
            <li class="flex-1">
              <a
                href="#"
                class={`${
                  state.settingsClicked ? "bg-white" : "bg-gray-100"
                } transition-all duration-300 ease-in-out text-gray-800 relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:bg-white hover:text-gray-700`}
                onClick={() => handleItemClick("settingsClicked")}
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`animate-slide-down lg:top-16 md:right-10 lg:right-48 lg:mx-0 mx-14 ${
          notificationsClicked ? "fixed z-10 " : "hidden"
        } `}
      >
        <Notifications
          close={() => setNotificationsClicked(!notificationsClicked)}
        />
      </div>
    </>
  );
};
export default Navbar;
