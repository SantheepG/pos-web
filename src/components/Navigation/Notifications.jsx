import React, { useEffect } from "react";
import { useAppContext } from "../../AppContext";
import Notify from "../../ui-components/Notifications/Notify";
import Warning from "../../ui-components/Notifications/Warning";
const Notifications = ({ close }) => {
  const { alerts } = useAppContext();
  useEffect(() => {
    console.log(alerts);
  }, [alerts]);
  return (
    <React.Fragment>
      <div
        class="animate-slide-down overflow-hidden -ml-3 z-50 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
        id="notification-dropdown"
        onClick={close}
      >
        <div class="flex justify-between py-2 px-8 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notifications
          <button
            type="button"
            class="text-gray-400 ml-56  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="editUserModal"
            onClick={close}
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">
              <a href="#">Close</a>
            </span>
          </button>
        </div>

        <div class="h-80 overflow-y-auto">
          {alerts &&
            alerts.length !== 0 &&
            alerts.map((alert) => {
              if (alert.stock === 0) {
                return <Notify key={alert.id} item={alert} />;
              } else if (alert.stock > 0 && alert.stock < 5) {
                return <Warning key={alert.id} item={alert} />;
              } else {
                return null;
              }
            })}

          {alerts.length === 0 && (
            <a
              href="#"
              class="flex py-3 px-32 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div class="pl-3 w-full">
                <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  Nothing available
                </div>
              </div>
            </a>
          )}
        </div>
        <a
          href="#"
          class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div class="inline-flex items-center "></div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
