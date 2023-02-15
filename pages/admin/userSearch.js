import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";

const UserSearch = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
  const router = useRouter();

  console.log(router.query.searchquery);
  return (
    <>
      <style jsx global>{`
        footer,
        nav {
          display: none;
        }
      `}</style>

      <Sidebar
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        sideBarRef={sideBarRef}
      />
      <AdminNav
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        sideBarRef={sideBarRef}
      />
      <div
        className={`main pl-0 transition-all duration-300 mt-20 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className={`maindiv text-black pt-4 mt-10`}>
          <h1 className="text-3xl ml-4 font-ubuntu">
            Your Search Results for <b>{router.query.searchquery}</b>...
          </h1>


          <div className="searchResults">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
