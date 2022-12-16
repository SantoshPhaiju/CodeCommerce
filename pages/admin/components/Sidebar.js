import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiEyeLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
<<<<<<< HEAD
import { MdDashboard } from 'react-icons/md'
=======
>>>>>>> d11d37e5aac308441d2977ce769ed3b9dd8af6c0
import { HiOutlineTemplate, HiOutlinePlusCircle } from "react-icons/hi";

const Sidebar = ({ showSideBar, setShowSidebar, sideBarRef }) => {
  const router = useRouter();
  return (
    <div
      ref={sideBarRef}
      className={`sidebar transform  sm:translate-x-0 sm:block bg-[#0e0e23] h-[100vh] py-4 px-4 shadow-lg shadow-gray-900 fixed top-0 bottom-0 left-0 transition-all duration-300 -mb-[50px] z-50 ${
        showSideBar === false ? "w-[80px] -translate-x-96" : "w-[250px] translate-x-0"
      }`}
    >
      <div className="logo flex items-center justify-center mt-2 mb-4 space-x-4">
        <img
          src="/logo2.jpg"
          className="text-white rounded-full h-10 w-10"
          alt=""
        />
        {showSideBar && (
          <h1 className="text-white font-robotoslab text-lg">CODECOMMERCE</h1>
        )}
      </div>
      <hr className="border-pink-600" />
      <div className="sidenav">
        {showSideBar && (
          <h2 className="text-slate-600 text-lg font-semibold font-sans my-4 mx-auto">
            DASHBOARD
          </h2>
        )}
        <ul className="text-white text-lg font-firasans flex flex-col gap-4">
          <Link href={"/admin"}>
            {showSideBar ? (
              <li
                className={`transition-all duration-500 py-2 px-2 relative  hover:bg-slate-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                  router.pathname === "/admin"
                    ? "bg-pink-700 text-white gap-5"
                    : "text-slate-600"
                }`}
              >
                <AiOutlineHome />
                <span>Dashboard</span>
              </li>
            ) : (
              <div className="mt-4 flex justify-center text-xl border border-red-800 rounded-full p-3 bg-pink-600">
                <AiOutlineHome />
              </div>
            )}
          </Link>
          <Link href={"/admin/allproducts"}>
            {showSideBar ? (
              <li
                className={`transition-all duration-500 py-2 px-2 relative  hover:bg-gray-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                  router.pathname === "/admin/allproducts"
                    ? "bg-pink-700 text-white gap-5"
                    : "text-slate-600"
                }`}
              >
                <HiOutlineTemplate />
                <span>All Products</span>
              </li>
            ) : (
              <div className="mt-4 flex justify-center text-xl border border-red-800 rounded-full p-3 bg-pink-600">
                <HiOutlineTemplate />
              </div>
            )}
          </Link>
          <Link href={"/admin/addproducts"}>
            {showSideBar ? (
              <li
                className={`transition-all duration-500 py-2 px-2 relative  hover:bg-slate-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                  router.pathname === "/admin/addproducts"
                    ? "bg-pink-700 text-white gap-5"
                    : "text-slate-600"
                }`}
              >
                <HiOutlinePlusCircle />
                <span>Add Products</span>
              </li>
            ) : (
              <div className="mt-4 flex justify-center text-xl border border-red-800 rounded-full p-3 bg-pink-600">
                <HiOutlinePlusCircle />
              </div>
            )}
          </Link>
          <Link href={"/admin/orders"}>
            {showSideBar ? (
              <li
                className={`transition-all duration-500 py-2 px-2 relative  hover:bg-slate-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                  router.pathname === "/admin/orders"
                    ? "bg-pink-700 text-white gap-5"
                    : "text-slate-600"
                }`}
              >
                <RiEyeLine />
                <span>Orders</span>
              </li>
            ) : (
              <div className="mt-4 flex justify-center text-xl border border-red-800 rounded-full p-3 bg-pink-600">
                <RiEyeLine />
              </div>
            )}
          </Link>
          <Link href={"/admin/users"}>
            {showSideBar ? (
              <li
                className={`transition-all duration-500 py-2 px-2 relative  hover:bg-slate-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                  router.pathname === "/admin/users"
                    ? "bg-pink-700 text-white gap-5"
                    : "text-slate-600"
                }`}
              >
                <RiUserLine />
                <span>Users</span>
              </li>
            ) : (
              <div className="mt-4 flex justify-center text-xl border border-red-800 rounded-full p-3 bg-pink-600">
                <RiUserLine />
              </div>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
