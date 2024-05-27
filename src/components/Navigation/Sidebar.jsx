import React from "react";
import avatar from "../../assets/default-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };
  return (
    <>
      <aside class="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r shadow-lg bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div class="-mx-6 px-6 py-4 m-6 mx-6 text-gray-500 ">
            <a href="#" title="home">
              POS System
            </a>
          </div>

          <div class="mt-8 text-center">
            <img
              src={avatar}
              alt=""
              class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              POS admin
            </h5>
            <span class="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul class="space-y-2 tracking-wide mt-8">
            <li>
              <a
                href="#"
                aria-label="dashboard"
                className={`${
                  state.dashboardClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition-all duration-300 ease-in-out`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                    class="fill-current text-cyan-400 dark:fill-slate-600"
                  ></path>
                  <path
                    d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                    class="fill-current text-cyan-200 group-hover:text-cyan-300"
                  ></path>
                  <path
                    d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                    class="fill-current group-hover:text-sky-300"
                  ></path>
                </svg>
                <span class="-mr-1 font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${
                  state.itemsClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition-all duration-300 ease-in-out`}
                onClick={() => handleItemClick("itemsClicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Items</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${
                  state.inventoryClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition-all duration-300 ease-in-out`}
                onClick={() => handleItemClick("inventoryClicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Inventory</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${
                  state.salesClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition duration-300 ease-in-out`}
                onClick={() => handleItemClick("salesClicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  />
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Sales</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${
                  state.usersClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition-all duration-300 ease-in-out`}
                onClick={() => handleItemClick("usersClicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    cx="10"
                    cy="6"
                    r="4"
                  />

                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M2 18c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7H2z"
                  />
                </svg>

                <span class="group-hover:text-gray-700">Users</span>
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                className={`${
                  state.settingsClicked
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                } transition-all duration-300 ease-in-out`}
                onClick={() => handleItemClick("settingsClicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M9.243 2.828a1 1 0 011.514 0l.793.793a1 1 0 01.198.316 8.023 8.023 0 011.366.637 1 1 0 01.343 1.367l-.793.793a1 1 0 01-.316.198 8.041 8.041 0 01-.637 1.366 1 1 0 01-1.367.343l-.793-.793a1 1 0 01-.198-.316 8.023 8.023 0 01-1.366-.637 1 1 0 01-.343-1.367l.793-.793a1 1 0 01.316-.198 8.041 8.041 0 01.637-1.366z"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M11 11a3 3 0 11-6 0 3 3 0 016 0zM2.828 9.243a1 1 0 010-1.514l.793-.793a1 1 0 01.198-.316 8.023 8.023 0 01.637-1.366 1 1 0 011.367-.343l.793.793a1 1 0 01.316.198 8.041 8.041 0 011.366.637 1 1 0 01.343 1.367l-.793.793a1 1 0 01-.198.316 8.023 8.023 0 01-.637 1.366 1 1 0 01-1.367.343l-.793-.793a1 1 0 01-.198-.316 8.041 8.041 0 01-.637-1.366zM9.243 17.172a1 1 0 01-1.514 0l-.793-.793a1 1 0 01-.198-.316 8.023 8.023 0 01-1.366-.637 1 1 0 01-.343-1.367l.793-.793a1 1 0 01.316-.198 8.041 8.041 0 01.637-1.366 1 1 0 011.367-.343l.793.793a1 1 0 01.198.316 8.023 8.023 0 011.366.637 1 1 0 01.343 1.367l-.793.793a1 1 0 01-.316.198 8.041 8.041 0 01-.637 1.366zM17.172 10.757a1 1 0 010 1.514l-.793.793a1 1 0 01-.198.316 8.023 8.023 0 01-1.366.637 1 1 0 01-1.367-.343l-.793-.793a1 1 0 01-.316-.198 8.041 8.041 0 01-.637-1.366 1 1 0 01.343-1.367l.793-.793a1 1 0 01.316-.198 8.023 8.023 0 011.366-.637 1 1 0 011.367.343l.793.793a1 1 0 01.198.316 8.041 8.041 0 01.637 1.366z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="group-hover:text-gray-700">Settings</span>
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Finance</span>
              </a>
            </li> */}
          </ul>
        </div>

        <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t"></div>
      </aside>
    </>
  );
};
export default Sidebar;
