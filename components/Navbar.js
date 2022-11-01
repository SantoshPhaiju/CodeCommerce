import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import {BsFillBagCheckFill} from "react-icons/bs"

const Navbar = () => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between shadow-lg w-full bg-white">
        <Link href={"/"}>
          <div className="logo flex items-center text-lg font-mono text-blue-800 font-semibold ml-4">
            <Image
              src={"/roundedLogo.png"}
              className=""
              alt="Logo"
              width={60}
              height={60}
            />
            <h2
              className={`font-firasans text-base 2xl:text-lg font-normal font-bold txl ml-2`}
            >
              CodeCommerce.Com
            </h2>
          </div>
        </Link>
        <nav className="flex items-center">
          <ul className="flex items-center justify-center space-x-5">
            <Link href={"/"} className={`link font-firasans`}>
              <li>Home</li>
            </Link>
            <Link href={"/tshirts"} className={`link font-firasans`}>
              <li>Tshirts</li>
            </Link>
            <Link href={"/mugs"} className={`link font-firasans`}>
              <li>Mugs</li>
            </Link>
            <Link href={"/hoodies"} className={`link font-firasans`}>
              <li>Hoodies</li>
            </Link>
            <Link href={"/books"} className={`link font-firasans`}>
              <li>Books</li>
            </Link>
          </ul>
        </nav>

        <div className="buttons flex items-center justify-center md:mr-7 text-xl md:text-3xl space-x-4 mb-3 md:mb-0">
          <span className="font-firasans text-base">Cart</span>
          <AiOutlineShoppingCart
            className="cursor-pointer"
            onClick={toggleCart}
          />
          {/* <Link href={"/"}>
          <MdOutlineAccountCircle />
        </Link> */}
        </div>
        <div
          className="sidebar fixed top-0 right-0 bg-pink-200 px-6 py-10 transition-all transform translate-x-full duration-300 w-72 md:w-96 2xl:w-[27vw] h-[100vh] shadow-lg shadow-gray-500 z-20 font-medium"
          ref={ref}
        >
          <h2 className="font-bold text-xl text-center mb-2 font-roboto text-blue-800 xl:text-2xl 2xl:text-3xl">
            Shopping Cart
          </h2>
          <span className="absolute top-4 right-6" onClick={toggleCart}>
            <AiFillCloseCircle className="text-2xl cursor-pointer text-pink-500" />
          </span>
          <ol className="list-decimal">
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code Lorem ipsum dolor sit amet
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black ">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code Lorem ipsum dolor
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black ">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black ">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black ">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
            <li>
              <div className="item flex my-3 font-firasans text-base 2xl:text-lg font-normal text-black ">
                <div className="w-2/3 font-semibold">
                  Tshirt - Wear the Code
                </div>
                <div className="w-1/3 font-semibold flex items-center justify-center gap-3 text-lg">
                  <AiFillPlusCircle className="text-xl text-pink-600 cursor-pointer" />
                  <span>1</span>
                  <AiFillMinusCircle className="text-xl text-pink-600 cursor-pointer" />
                </div>
              </div>
            </li>
          </ol>
          <div className="button flex flex-col lg:flex-row gap-4 justify-center items-center my-10 lg:space-x-3">
            <button className="font-firasans bg-pink-500 py-1 text-lg px-8 md:px-5 text-blue-100 font-medium text-center rounded-md shadow-lg shadow-gray-700/60 hover:bg-pink-700 flex items-center justify-center space-x-3">
              <BsFillBagCheckFill />
              <span>CheckOut</span>
            </button>
            <button className="font-firasans bg-red-600 py-1 text-lg px-8 md:px-5 text-blue-100 font-medium text-center rounded-md shadow-lg shadow-gray-700/60 hover:bg-red-800 flex items-center justify-center space-x-3">
              <AiFillDelete />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
