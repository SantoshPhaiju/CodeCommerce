import React, { useRef, useState } from 'react'
import AdminNav from './AdminNav';
import Sidebar from './Sidebar';

const MainConfig = ({showSideBar, setShowSidebar}) => {
    const sideBarRef = useRef();
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
    </>
  );
}

export default MainConfig
