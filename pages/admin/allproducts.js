import React from 'react'
import Sidebar from './components/Sidebar';

const AllProducts = () => {
  return (
    <div>
      <style jsx global>{`
        footer,
        nav {
          display: none;
        }
      `}</style>
      <div className="container h-[100vh] w-[100vw] flex gap-4">
      <Sidebar />
      <div className="allproducts">
        This is the all products page here.
      </div>
      </div>
    </div>
  );
}

export default AllProducts
