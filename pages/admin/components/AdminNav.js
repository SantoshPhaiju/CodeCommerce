import React from "react";
import {HiOutlineMenuAlt1} from 'react-icons/hi'

const AdminNav = ({showSideBar, setShowSidebar, sideBarRef}) => {
  const toggleSideBar = () =>{
    setShowSidebar(!showSideBar);
  }
  return (
    <div>
      <div
        className={`w-[100%] transition-all duration-300 bg-white py-6 px-4 fixed left-0 shadow-lg ${
          showSideBar === false ? "pl-0 sm:pl-[90px]" : "pl-[260px]"
        }`}
      >
        <HiOutlineMenuAlt1
          className="text-2xl"
          onClick={() => toggleSideBar()}
        />
      </div>
    </div>
  );
};

export default AdminNav;
