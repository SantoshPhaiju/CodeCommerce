import React from "react";
import {HiOutlineMenuAlt1} from 'react-icons/hi'

const AdminNav = () => {
  return (
    <div>
      <div className="w-[100%] bg-white py-6 px-4 fixed left-0 pl-[260px] shadow-lg">
        <HiOutlineMenuAlt1 className="text-2xl" />
      </div>
    </div>
  );
};

export default AdminNav;
