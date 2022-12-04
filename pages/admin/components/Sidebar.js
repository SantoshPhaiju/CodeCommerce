import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { RiUserLine } from "react-icons/ri";
import { HiOutlineTemplate, HiOutlinePlusCircle } from "react-icons/hi";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="hidden sm:block sidebar w-[250px] bg-[#0e0e23] h-[100vh] py-4 px-4 shadow-lg shadow-gray-900 fixed top-0 bottom-0 left- -mb-[50px] z-50">
      <div className="logo flex items-center justify-center mt-2 mb-4 space-x-4">
        <img
          src="/logo2.jpg"
          className="text-white rounded-full h-10 w-10"
          alt=""
        />
        <h1 className="text-white font-robotoslab text-lg">CODECOMMERCE</h1>
      </div>
      <hr className="border-pink-600" />
      <div className="sidenav">
        <h2 className="text-slate-600 text-lg font-semibold font-sans my-4 mx-auto">
          DASHBOARD
        </h2>
        <ul className="text-white text-lg font-firasans flex flex-col gap-4">
          <Link href={"/admin"}>
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
          </Link>
          <Link href={"/admin/allproducts"}>
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
          </Link>
          <Link href={"/admin/addproducts"}>
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
          </Link>
          <Link href={"/admin/orders"}>
            <li
              className={`transition-all duration-500 py-2 px-2 relative  hover:bg-slate-800 hover:text-white cursor-pointer rounded-md flex items-center gap-4 hover:gap-5 ${
                router.pathname === "/admin/orders"
                  ? "bg-pink-700 text-white gap-5"
                  : "text-slate-600"
              }`}
            >
              <CiBoxList />
              <span>Orders</span>
            </li>
          </Link>
          <Link href={"/admin/users"}>
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
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
