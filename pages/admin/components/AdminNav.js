import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const AdminNav = ({ showSideBar, setShowSidebar }) => {
  const toggleSideBar = () => {
    setShowSidebar(!showSideBar);
  };
  return (
    <div>
      <div
        className={`w-[100%] z-20 transition-all duration-300 bg-white py-6 px-4 fixed left-0 shadow-lg flex justify-between ${
          showSideBar === false ? "pl-0 sm:pl-[90px]" : "pl-[260px]"
        }`}
      >
        <HiOutlineMenuAlt1
          className="text-2xl cursor-pointer ml-4"
          onClick={() => toggleSideBar()}
        />
        <h1 className="mr-20 font-robotoslab hidden lg:block">Hello Admin</h1>
      </div>
    </div>
  );
};

export default AdminNav;
