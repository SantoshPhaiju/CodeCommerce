import Link from "next/link";
import React from "react";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({cart, subTotal, addToCart, removeFromCart}) => {
  return (
    <div className="container mx-auto max-w-[1200px] px-3">
      <h1 className="font-bold text-3xl my-8 text-pink-800 text-center font-roboto">
        Checkout
      </h1>
      <h2 className="font-medium font-firasans text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-2">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="3"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              PinCode
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-medium font-firasans text-xl mt-8">
        2. Review Cart Items & Pay
      </h2>
      <div className="sidebar bg-pink-100 px-10 py-4 m-2 rounded-md font-medium">
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="text-center my-5 font-light font-firasans">
              Your cart is Empty ! 😵‍💫
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-3 text-base 2xl:text-lg font-firasans font-medium text-black">
                  <div className="">{cart[k].name}</div>
                  <div className="w-1/3 flex items-center justify-center gap-3 text-lg">
                    <AiFillMinusCircle
                      onClick={() =>
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="text-xl text-pink-600 cursor-pointer"
                    />
                    <span>{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() =>
                        addToCart(k, 1, 500, "Tshirt(XL, Blue)", "XL", "Blue")
                      }
                      className="text-xl text-pink-600 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="subtotal font-bold font-robotoslab">
          SubTotal: NRs.{subTotal}
        </span>
      </div>
        <div className="mx-8">
          <Link href={"/"}>
            <button className="font-firasans bg-pink-500 py-1 my-2 text-lg px-10 md:px-5 text-blue-100 font-medium text-center rounded-md hover:bg-pink-700">
              <span>Pay NRs.{subTotal}</span>
            </button>
          </Link>
        </div>
    </div>
  );
};

export default Checkout;
