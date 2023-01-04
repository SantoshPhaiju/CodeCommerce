import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

const Orders = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();

  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
  }
  const [orders, setOrders] = useState([
    {
      orderId: "239579384d8ddvd8",
      email: "santoshphaiju@gmail.com",
      amount: 20000,
      status: "Paid",
      deliveryStatus: "Order Placed",
      address: "Chabahil-7, Kathmandu",
    },
    {
      orderId: "239579384d8ddvd8",
      email: "santoshphaiju@gmail.com",
      amount: 20000,
      status: "Pending",
      deliveryStatus: "Order Placed",
      address: "Chabahil-7, Kathmandu",
    },
    {
      orderId: "239579384d8ddvd8",
      email: "santoshphaiju@gmail.com",
      amount: 20000,
      status: "Paid",
      deliveryStatus: "Order Placed",
      address: "Chabahil-7, Kathmandu",
    },
  ]);

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
        <div className="maindiv text-black pt-0 mt-10">
          <div className="ordersTable py-10">
            <div className="container w-[96%] sm:w-[90%] mx-auto">
              <h1 className="font-roboto text-2xl text-center my-6 text-pink-700">
                All Orders
              </h1>

              {/* {orders.length === 0 && (
                <div className=" text-center text-red-900 font-roboto text-lg">
                  {" "}
                  No orders found! 😖{" "}
                </div>
              )} */}

              {/* {orders.length > 0 && ( */}
              <div className="overflow-x-auto relative shadow-md shadow-gray-500/30 mb-10">
                <table className="border-collapse border border-gray-900 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-base font-firasans text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        S.N.
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Order Id
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Delivery Status
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 border-2 border-gray-700"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-gray-800 dark:border-gray-700 font-firasans"
                        >
                          <td className="py-4 px-6 border-2 border-gray-700">
                            {index + 1}
                          </td>
                          <td
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline border-2 border-gray-700"
                          >
                            <Link href={"/order?id=" + item?._id}>
                              # {item?.orderId}
                            </Link>
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            {item?.email}
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            Rs.{item?.amount}
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            <span className={`py-1 px-4 rounded-sm text-white ${item?.status === "Pending" ? "bg-yellow-500" : ""} ${item?.status === "Paid" ? "bg-yellow-600/80" : ""} `}>{item?.status}</span>
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            {item?.deliveryStatus}
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            {item?.address}
                          </td>
                          <td className="py-4 px-6 border-2 border-gray-700">
                            <div className="flex space-x-3">

                            <Link
                              href={"/order?id=" + item?._id}
                              className="font-medium rounded-sm flex items-center justify-center space-x-1 py-2 px-3 bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-110"
                              >
                              <AiOutlineEye className="text-lg" />
                              <span>View</span>
                            </Link>
                            <button
                              onClick={() => deleteOrder(item?._id)}
                              className="font-medium rounded-sm flex items-center justify-center space-x-1 py-2 px-3 bg-red-600 text-white hover:bg-red-800 hover:scale-110"
                            >
                              <AiOutlineDelete className="text-lg" />
                              <span>Delete</span>
                            </button>
                              </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
