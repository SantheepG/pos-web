import React, { useState, useEffect } from "react";
import RecentOrders from "./RecentOrders";
import { formatNumberWithSpace } from "../CommonFuncs";
import { useAppContext } from "../../AppContext";
const Dashboard = () => {
  const { users, sales, items } = useAppContext();
  const [earned, setEarned] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    if (sales && sales.length > 0) {
      const sum = sales.reduce((acc, sale) => acc + sale.total, 0);
      let count = sum - 15;
      const intervalId = setInterval(() => {
        count += 1;
        if (count > sum) {
          clearInterval(intervalId);
        } else {
          setEarned(count);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [sales]);

  useEffect(() => {
    if (users) {
      let count = 0;
      const intervalId = setInterval(() => {
        count += 1;
        if (count > users.length) {
          clearInterval(intervalId);
        } else {
          setUsersCount(count);
        }
      }, 150);

      return () => clearInterval(intervalId);
    }
  }, [users]);

  useEffect(() => {
    if (sales) {
      let count = 0;
      const intervalId = setInterval(() => {
        count += 1;
        if (count > sales.length) {
          clearInterval(intervalId);
        } else {
          setSalesCount(count);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [sales]);

  useEffect(() => {
    if (items) {
      let count = 0;
      const intervalId = setInterval(() => {
        count += 1;
        if (count > items.length) {
          clearInterval(intervalId);
        } else {
          setProductCount(count);
        }
      }, 150);

      return () => clearInterval(intervalId);
    }
  }, [items]);

  return (
    <>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="px-6 pt-6 2xl:container animate-view-content">
          <div class="mt-6 mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total earned
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Rs.{formatNumberWithSpace(earned)}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                {/* <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong class="text-green-500">+55%</strong>&nbsp;than last
                  week
                </p> */}
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Users
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumberWithSpace(usersCount).split(".")[0]}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                {/* <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong class="text-green-500">+3%</strong>&nbsp;than last
                  month
                </p> */}
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-white group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Products
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumberWithSpace(productCount).split(".")[0]}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                {/* <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong class="text-red-500">-2%</strong>&nbsp;than yesterday
                </p> */}
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Sales
                </p>
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumberWithSpace(salesCount).split(".")[0]}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                {/* <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong class="text-green-500">+5%</strong>&nbsp;than
                  yesterday
                </p> */}
              </div>
            </div>
          </div>
          <RecentOrders />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
