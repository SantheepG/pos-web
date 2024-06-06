import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import CartItem from "./CartItem";
import { useAppContext } from "../../AppContext";
import OrderPlacement from "./OrderPlacement";
import { formatNumberWithSpace } from "../CommonFuncs";

const Items = () => {
  const { items, refetchItems, refetchSales } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("All products");
  const [itemsToView, setItemsToView] = useState(null);
  const [cart, setCart] = useState([]);
  const cartArray = Array.from(cart);
  const [subtotal, setSubtotal] = useState(0);
  const [orderClicked, setOrderClicked] = useState(false);

  useEffect(() => {
    if (items) {
      setItemsToView(items);
      let categories = [...new Set(items.map((item) => item.category))];
      setCategories(categories);
    }
  }, [items]);

  const calculateSubtotal = (cart) => {
    return cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  useEffect(() => {
    setSubtotal(calculateSubtotal(cart));
  }, [cart]);

  const searchItem = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setItemsToView(items);
    } else {
      let matchedProducts = items.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setItemsToView(matchedProducts);
    }
  };
  const handleCategoryChange = (event) => {
    if (event.target.value === "all") {
      setItemsToView(items);
      setTitle("All Products");
    } else {
      setTitle(event.target.value);

      const filteredProducts = items.filter(
        (item) => item.category === event.target.value
      );

      setItemsToView(filteredProducts);
    }
  };
  // const addItemToCart = (item) => {
  //   setCart((prevCart) => new Set(prevCart).add(item));
  //   console.log(cartArray);
  //   console.log(cart);
  // };
  const addItemToCart = (item) => {
    setCart((prevCart) => {
      // Ensure prevCart is an array
      if (!Array.isArray(prevCart)) prevCart = [];

      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        return prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, qty: cartItem.qty + 1 };
          }
          return cartItem;
        });
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  // const removeItemFromCart = (item) => {
  //   setCart((prevCart) => {
  //     const newCart = new Set(prevCart);
  //     newCart.delete(item);
  //     return newCart;
  //   });
  // };

  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => {
      // Ensure prevCart is an array
      if (!Array.isArray(prevCart)) prevCart = [];

      return prevCart.filter((cartItem) => cartItem.id !== itemId);
    });
  };

  const increaseQty = (itemId) => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) prevCart = [];

      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId && cartItem.stock > cartItem.qty) {
          return { ...cartItem, qty: cartItem.qty + 1 };
        }
        return cartItem;
      });
    });
  };

  const decreaseQty = (itemId) => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) prevCart = [];

      return prevCart
        .map((cartItem) => {
          if (cartItem.id === itemId) {
            const newQty = cartItem.qty - 1;
            if (newQty > 0) {
              return { ...cartItem, qty: newQty };
            } else {
              return null;
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem !== null); // Remove items with qty <= 0
    });
  };

  return (
    <>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="px-6 pt-6 2xl:container animate-view-content">
          <div
            class={`${orderClicked ? "opacity-40" : ""} font-sans  rounded-2xl`}
          >
            <div class="flex max-sm:flex-col gap-4 h-full shadow-xl rounded-2xl">
              <div class="max-w-4xl mx-auto w-full h-max rounded-2xl p-4 sticky top-0 pb-16">
                <main class="w-full overflow-y-auto">
                  <div class="px-10 mt-5 flex justify-between w-full">
                    <div class="flex justify-between w-full pb-6">
                      <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400 w-108">
                        <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                          <svg
                            xmlns="http://ww50w3.org/2000/svg"
                            class="w-4 fill-current"
                            viewBox="0 0 35.997 36.004"
                          >
                            <path
                              id="Icon_awesome-search"
                              data-name="search"
                              d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                            ></path>
                          </svg>
                        </span>
                        <input
                          type="search"
                          name="leadingIcon"
                          id="leadingIcon"
                          placeholder="Search here"
                          class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                          onChange={(e) => searchItem(e)}
                        />
                      </div>
                      {items === null && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className={`w-6 h-6 me-3 text-cyan-200 animate-spin dark:text-gray-600`}
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
                      <div className="">
                        <select
                          class="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200"
                          onChange={(e) => handleCategoryChange(e)}
                        >
                          <span>Category</span>
                          {/* <svg
                        class="rotate-90 group-focus:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                        />
                      </svg> */}

                          <option key="all" name="all" value="all">
                            All
                          </option>

                          {categories &&
                            categories.length !== 0 &&
                            categories.map((category) => (
                              <option
                                class="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                                key={category}
                                name={category}
                                value={category}
                              >
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-xl:gap-4 gap-4 sm:overflow-auto sm:h-[calc(100vh-140px)] pb-36">
                    {itemsToView &&
                      itemsToView.length !== 0 &&
                      itemsToView.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          cart={cartArray}
                          view={() => {
                            // setProductClicked(true);
                            // setSelectedItem(item);
                          }}
                          addToCart={() => {
                            addItemToCart(item);
                          }}
                        />
                      ))}{" "}
                    {itemsToView && itemsToView.length === 0 && (
                      <div className="m-10 text-gray-500">Empty here</div>
                    )}
                  </div>
                </main>
              </div>
              <div class="text-black sm:h-screen sm:sticky lg:sticky lg:top-24 sm:top-0 lg:min-w-[350px] sm:min-w-[300px]">
                <div class="relative  border-1 shadow-xl rounded-2xl bg-white border">
                  <div class="p-4 sm:overflow-auto sm:h-[calc(100vh-140px)] pb-48">
                    <div class="space-y-4">
                      {cartArray !== null &&
                        cartArray.length !== 0 &&
                        cartArray.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            increase={() => {
                              increaseQty(item.id);
                            }}
                            decrease={() => {
                              decreaseQty(item.id);
                            }}
                            remove={() => {
                              removeItemFromCart(item.id);
                            }}
                          />
                        ))}
                      {cartArray !== null && cartArray.length === 0 && (
                        <div className="m-10 text-gray-500">Empty here</div>
                      )}
                    </div>
                  </div>

                  <div class="md:absolute md:left-0 md:bottom-0 bg-gradient-to-r from-sky-600 to-cyan-400 w-full p-4 rounded-b-2xl">
                    <h4 class="flex flex-wrap gap-4 text-base text-white text-lg">
                      Subtotal{" "}
                      <span class="ml-auto">
                        Rs.{formatNumberWithSpace(parseFloat(subtotal))}
                      </span>
                    </h4>
                    <button
                      type="button"
                      class="w-full mt-2 text-gray-900 text-bold bg-gradient-to-r from-cyan-200 to-cyan-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      disabled={cartArray.length === 0}
                      onClick={() => {
                        setOrderClicked(true);
                      }}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      {orderClicked && (
        <div className="h-screen-full overflow-y-auto">
          {" "}
          <OrderPlacement
            cart={cartArray}
            subTotal={subtotal}
            ordered={() => {
              refetchItems();
              refetchSales();
              setCart([]);
              setOrderClicked(false);
            }}
            close={() => setOrderClicked(false)}
          />
        </div>
      )}
    </>
  );
};
export default Items;
