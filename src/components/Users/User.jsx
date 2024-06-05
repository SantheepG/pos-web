import React, { useState, useEffect } from "react";
import avatar from "../../assets/default-avatar.png";
const User = ({
  user,

  userToDelete,
  setUserToDelete,
  cancelDelete,
  proceedToDelete,
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (userToDelete && userToDelete.id === user.id) {
      setDeleteClicked(true);
    } else {
      setDeleteClicked(false);
      setFade(false);
    }
  }, [userToDelete, user]);
  return (
    <>
      {user && (
        <div
          class={`${
            fade ? "opacity-40" : ""
          } bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative shadow-md`}
        >
          <div
            class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 hover:bg-white hover:text-red-600"
            onClick={setUserToDelete}
          >
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
            {!deleteClicked && (
              <>
                <h3 class="text-lg font-bold text-gray-800">{user.name}</h3>
                <p class="text-gray-600 text-sm mt-2">
                  {user.phone} | {user.email}
                </p>
              </>
            )}
            {deleteClicked && (
              <>
                <h5 class="mb-4 w-full text-center text-gray-800">
                  Delete
                  <span className="font-semibold"> {user.name}</span>?
                </h5>
                <div className="animate-slide-down flex justify-center space-x-2">
                  <button
                    type="button"
                    class="text-gray-600 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:gray-600 hover:border-gray-500"
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 text-xs border rounded-xl px-2 py-1 cursor-pointer hover:red-800 hover:border-red-500"
                    onClick={() => {
                      proceedToDelete();
                      setFade(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default User;
