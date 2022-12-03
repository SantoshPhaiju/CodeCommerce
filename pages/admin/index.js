import React from "react";
import Sidebar from "./components/Sidebar";

const Index = () => {
  return (
    <>
      <style jsx global>{`
        footer, nav {
          display: none;
        }
        
      `}</style>
      <Sidebar />
      <div>This is the admin page here</div>
    </>
  );
};

export default Index;
