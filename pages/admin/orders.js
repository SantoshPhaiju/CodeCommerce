import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
const orders = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();

  const router = useRouter();

   if (typeof window !== "undefined") {
     if (!localStorage.getItem("admin-token")) {
       router.push("/admin/login");
     }
   }
  const [orders, setOrders] = useState([]);

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
                <div className="overflow-x-auto relative shadow-md shadow-gray-500/30 sm:rounded-lg mb-10">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-base font-firasans text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-4 px-6">
                          S.N.
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Order Id
                        </th>
                        <th scope="col" className="py-4 px-6">
                          email
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Amount
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Status
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => {
                        // console.log(item);
                        return (
                          <tr
                            key={item?._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-firasans"
                          >
                            <td className="py-4 px-6">{index + 1}</td>
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline"
                            >
                              <Link href={"/order?id=" + item?._id}>
                                # {item?.orderId}
                              </Link>
                            </th>
                            <td className="py-4 px-6">{item?.email}</td>
                            <td className="py-4 px-6">Rs.{item?.amount}</td>
                            <td className="py-4 px-6">{item?.status}</td>
                            <td className="py-4 px-6 flex space-x-3">
                              {item?.status === "Pending" && (
                                <>
                                  {" "}
                                  <Link
                                    href={"/order?id=" + item?._id}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                    Details
                                  </Link>
                                  <button
                                    onClick={() => deleteOrder(item?._id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                    Delete
                                  </button>{" "}
                                </>
                              )}
                              {item?.status === "Paid" && (
                                <>
                                  <Link href={"/order?id=" + item?._id}>
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                      Details
                                    </button>
                                  </Link>
                                </>
                              )}
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


export default orders;
