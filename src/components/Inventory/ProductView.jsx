import React from "react";

const ProductView = ({ close }) => {
  return (
    <>
      <div class="flex justify-center -mt-96 -ml-48 bg-white  ">
        <div className="block bg-white z-50 border-1 rounded-xl p-4  shadow-md border-t-2">
          <div className="flex justify-end mx-8 my-2" onClick={close}>
            <div className="bg-gray-100 hover:bg-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 fill-current text-red-600"
                viewBox="0 0 24 24"
              >
                <path d="M18 6.343l-1.414-1.414L12 9.515 7.414 4.929 6 6.343l4.586 4.586L6 15.515l1.414 1.414L12 13.343l4.586 4.586L18 15.515l-4.586-4.586L18 6.343z" />
              </svg>
            </div>
          </div>
          <div class="max-w-lg mx-auto my-10 bg-white rounded-lg p-1">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              src="https://picsum.photos/200"
              alt="Profile picture"
            />
            <h2 class="text-center text-2xl font-semibold mt-3">John Doe</h2>
            <p class="text-center text-gray-600 mt-1">Software Engineer</p>
            <div class="flex justify-center mt-5">
              <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
                Twitter
              </a>
              <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
                LinkedIn
              </a>
              <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">
                GitHub
              </a>
            </div>
            <div class="mt-5">
              <h3 class="text-xl font-semibold">Bio</h3>
              <p class="text-gray-600 mt-2">
                John is a software engineer with over 10 years of experience in
                developing web and mobile applications. He is skilled in
                JavaScript, React, and Node.js.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductView;
