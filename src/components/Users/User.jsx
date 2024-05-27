import React from "react";
import avatar from "../../assets/default-avatar.png";
const User = () => {
  return (
    <>
      {" "}
      <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
        <div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 hover:bg-white hover:text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            class="fill-gray-800 inline-block hover:fill-red-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 3V4H4V6H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H20V4H15V3H9ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z" />
          </svg>
        </div>
        <div class="w-6/12 h-6/12 overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
          <img src={avatar} alt="User" class="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 class="text-lg font-bold text-gray-800">Blaze Burst</h3>
          <p class="text-gray-600 text-sm mt-2">+9412346 | admin@gmail.com</p>
        </div>
      </div>
    </>
  );
};
export default User;
