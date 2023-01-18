import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import {BiLogOutCircle} from 'react-icons/bi'
import { useRouter } from "next/router";

const AdminNav = ({ showSideBar, setShowSidebar }) => {
  const toggleSideBar = () => {
    setShowSidebar(!showSideBar);
  };

  const router = useRouter();
  return (
    <div>
      <div
        className={`w-[100%] z-20 transition-all duration-300 bg-white py-4 px-4 fixed left-0 shadow-lg flex justify-between items-center ${
          showSideBar === false ? "pl-0 sm:pl-[90px]" : "pl-[260px]"
        }`}
      >
        <HiOutlineMenuAlt1
          className="text-2xl cursor-pointer ml-4"
          onClick={() => toggleSideBar()}
        />
        <button className="flex space-x-2 items-center justify-center text-lg px-4 py-2 bg-slate-500 rounded-sm hover:bg-slate-700 text-white font-firasans shadow-md my-0" onClick={() => {
          localStorage.removeItem("admin-token");
          router.push("/login")
          }}>
          <span>LogOut</span>
          <BiLogOutCircle />
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
