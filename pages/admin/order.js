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

  // Get the orderDate in date format of javascript to convert it to localestring
  const orderDate = (createdAt) => {
    return new Date(createdAt);
  };

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
          <div className="font-medium mb-2 text-3xl font-roboto">
            Order Details:
          </div>
          <div className="bg-white p-4 rounded-lg grid grid-cols-12 gap-2">
            <div className="orderDetail col-span-5">
              <div className="flex items-center mb-4 font-firasans text-lg ">
                <div className="text-gray-600 mr-2">Order ID:</div>
                <div className="text-gray-800 font-bold">#{order.orderId}</div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Customer Name:</div>
                <div className="text-gray-800 font-bold">{order.name}</div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Status:</div>
                <div className="text-gray-800 font-bold">{order.status}</div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Email:</div>
                <div className="text-gray-800 font-bold">{order.email}</div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Ordered Date:</div>
                <div className="text-gray-800 font-bold bg-gray-200 rounded-sm cursor-not-allowed px-2 py-2">{orderDate(order.createdAt).toLocaleDateString()} {orderDate(order.createdAt).toLocaleTimeString()}</div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Total:</div>
                <div className="text-blue-600 font-bold">Rs.{order.amount}</div>
              </div>
            </div>

            <div className="shippingDetails col-span-7">
              <div className="font-medium mb-2 text-xl font-rubik">
                SHIPPING ADDRESS
              </div>
              <div className="flex items-center mt-6 mb-2 font-firasans text-lg">
                <div className="text-gray-800 font-bold">{order.name}</div>
              </div>
              <div className="flex items-center font-firasans text-base">
                <div className="text-gray-600">{order.address}</div>
              </div>
              <div className="flex items-center font-firasans text-base">
                <div className="text-gray-600">{order.state} Province, {order.city}</div>
              </div>
              <div className="flex items-center font-firasans text-base">
                <div className="text-gray-600">{order.phone}</div>
              </div>
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
