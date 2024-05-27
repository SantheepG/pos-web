import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //onEmailChange(email);
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((error) => {
        // toast.error("Invalid credentials");
        console.log(error);
      });
  };

  return (
    <>
      <div class="font-sans">
        <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
          <div class="relative sm:max-w-sm w-full">
            <div class="card bg-cyan-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div class="card bg-sky-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label
                for=""
                class="block mt-3 text-sm text-gray-700 text-center font-semibold"
              >
                Login
              </label>
              <form method="#" action="#" class="mt-10" onSubmit={logIn}>
                {" "}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mt-7">
                  <input
                    type="password"
                    placeholder="Password"
                    class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="mt-7 flex">
                  <label
                    for="remember_me"
                    class="inline-flex items-center w-full cursor-pointer"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="remember"
                    />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>

                  <div class="w-full text-right">
                    <a
                      class="underline text-sm text-gray-600 hover:text-gray-900"
                      href="#"
                    >
                      Forget password?
                    </a>
                  </div>
                </div>
                <div class="mt-7">
                  <button
                    class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    type="submit"
                  >
                    Login
                  </button>
                </div>{" "}
                <div class="flex mt-7 items-center text-center">
                  <hr class="border-gray-300 border-1 w-full rounded-md" />
                  <label class="block font-medium text-sm text-gray-600 w-full">
                    ``
                  </label>
                  <hr class="border-gray-300 border-1 w-full rounded-md" />
                </div>
                <div class="flex mt-7 justify-center w-full"></div>
                <div class="mt-7">
                  <div class="flex justify-center items-center">
                    <label class="mr-2">Copyright 2024</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
