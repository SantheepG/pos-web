import React from "react";
import { formatDate, formatNumberWithSpace } from "../../CommonFuncs";
const ProductCard = ({ view, item }) => {
  console.log(item);
  const convertTimestamp = (timestamp) => {
    // Parse the timestamp string into a Date object
    const date = new Date(timestamp);

    // Format the date using toLocaleString
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
      timeZoneName: "short", // Include the timezone name
    });

    return formattedDate;
  };
  return (
    <>
      <div
        class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative shadow-lg"
        onClick={view}
      >
        {/* <div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            class="fill-gray-800 inline-block"
            viewBox="0 0 64 64"
          >
            <path
              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
              data-original="#000000"
            ></path>
          </svg>
        </div> */}
        <div class="w-36 h-36 rounded-full overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
          <img
            // src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg"
            src={item.thumbnail}
            alt="Product"
            class="w-36 h-36 rounded-full "
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p key={item.stock} class="text-gray-600 text-sm mt-2">
            {item.category} |{" "}
            <span className={`${item.stock < 5 ? "text-red-600" : ""}`}>
              {item.stock} left
            </span>
          </p>

          <h4 class="text-lg text-gray-800 font-bold mt-2">
            Rs.{formatNumberWithSpace(item.price)}
          </h4>
          <p key={item.updatedAt} class="text-gray-500 text-xs mt-2">
            last update on
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {item.updatedAt && formatDate(item.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
