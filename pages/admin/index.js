import React from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";

const Index = () => {
  return (
    <>
      <style jsx global>{`
        footer,
        nav {
          display: none;
        }
      `}</style>
      <Sidebar />
      <AdminNav />
      <div className="main pl-[260px] mt-20">
      <div className="maindiv p-l-[260px] text-black pt-0 mt-10">
       admin here
      </div>
      </div>
    </>
  );
};

export default Index;
