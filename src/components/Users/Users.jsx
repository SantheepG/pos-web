import React, { useEffect, useState } from "react";
import User from "./User";
import AddUserView from "./AddUserView";
import { useAppContext } from "../../AppContext";
import { auth, db } from "../../FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Users = () => {
  const { users, refetchUsers } = useAppContext();
  const [usersArray, setUsersArray] = useState([]);
  const [addUserClicked, setAddUserClicked] = useState(false);

  useEffect(() => {
    if (users) {
      setUsersArray(Array.from(users));
    }
  }, [users, refetchUsers]);
  const handleDeleteUser = async (user) => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.uid === user.uid) {
        await deleteUser(currentUser);
      } else {
        throw new Error(
          "No user is currently signed in or user ID does not match."
        );
      }
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <ToastContainer />
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class={` 2xl:container animate-view-content`}>
          <div
            class={`${
              addUserClicked ? "opacity-40" : ""
            } font-[sans-serif] bg-white-50 rounded-2xl pb-4 px-6 pt-6`}
          >
            <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
              <div className="flex justify-between pt-6 pr-4 mx-12">
                <h5 class="text-xl font-bold text-gray-800 mb-12">Users</h5>
                {users === null && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className={`w-6 h-6 mt-3 text-cyan-200 animate-spin dark:text-gray-600`}
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
                <div
                  className="bg-gray-100 border rounded-xl hover:bg-white cursor-pointer p-2 h-10"
                  onClick={() => setAddUserClicked(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 fill-current text-green-600"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2v20M2 12h20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                {usersArray &&
                  usersArray !== 0 &&
                  usersArray.map((user) => (
                    <User
                      key={user.id}
                      user={user}
                      deleteUser={() => handleDeleteUser(user)}
                    />
                  ))}
                {usersArray && usersArray.length === 0 && (
                  <div className="m-10 text-gray-500">Empty here</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addUserClicked && (
        <AddUserView
          close={() => setAddUserClicked(false)}
          added={() => {
            setAddUserClicked(false);
            refetchUsers();
          }}
        />
      )}
    </>
  );
};
export default Users;
