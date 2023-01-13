import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import Order from "../../models/Order";

const OrderPage = ({ order }) => {
//   console.log("order", order);
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();

  const router = useRouter();
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
        className={`main pl-0 transition-all duration-300 mt-24 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="bg-gray-100 p-4 mx-10">
          <div className="text-lg font-medium mb-2">Order Details</div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="text-gray-600 mr-2">Order ID:</div>
              <div className="text-gray-800">#{order.orderId}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-gray-600 mr-2">Customer:</div>
              <div className="text-gray-800">{order.name}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-gray-600 mr-2">Status:</div>
              <div className="text-gray-800">{order.status}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-gray-600 mr-2">Total:</div>
              <div className="text-gray-800">{order.amount}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);
//   console.log(context.query.id);
  if (order === null) {
    order = {};
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default OrderPage;
