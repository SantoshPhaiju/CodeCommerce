import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/orderSlice";
import { BsFilterSquare } from "react-icons/bs";

const Orders = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [options, setOptions] = useState(false);
  const sideBarRef = useRef();
  const ordersSelState = useSelector((state) => state.order.orders);
  const [orders, setOrders] = useState("");

  useEffect(() => {
    setOrders(ordersSelState);
  }, [ordersSelState]);

  const dispatch = useDispatch();
  const router = useRouter();
  let admintoken;

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
    admintoken = localStorage.getItem("admin-token");
  }

  useEffect(() => {
    dispatch(fetchOrders(admintoken));
  }, []);

  // const orderDate = new Date("2022-11-25T13:44:14.437+00:00");
  const orderDate = (createdAt) => {
    return new Date(createdAt);
  };

  const showOptions = () => {
    setOptions(!options);
  };
  const sorting = (order) => {
    console.log(order);
    if (order === "oldFirst") {
      const sorted = [...orders].sort((a, b) => {
        // console.log(
        //   // orderDate(a.createdAt).getFullYear(),
        //   orderDate(a.createdAt).getMonth(),
        //   // orderDate(b.createdAt).getFullYear(),
        //   orderDate(b.createdAt).getMonth()
        // );
        const aDate =
          orderDate(a.createdAt).getFullYear() +
          "/" +
          (orderDate(a.createdAt).getMonth() +
            "/" +
            orderDate(a.createdAt).getDate());
        const bDate =
          orderDate(b.createdAt).getFullYear() +
          "/" +
          (orderDate(b.createdAt).getMonth() +
            "/" +
            orderDate(b.createdAt).getDate());
        // console.log(aDate, bDate);
        return (aDate > bDate) ? 1 : -1;
        // return orderDate(a.createdAt).getFullYear() >
        //   orderDate(b.createdAt).getFullYear()
        //   ? 1
        //   : -1;
      });
      setOrders(sorted);
      setSortOrder(order);
      console.log(sorted);
    }
    if (order === "newFirst") {
      const sorted = [...orders].sort((a, b) => {
        // console.log(
        //   orderDate(a.createdAt).getFullYear(),
        //   orderDate(b.createdAt).getFullYear()
        // );

        const aDate =
          orderDate(a.createdAt).getFullYear() +
          "/" +
          (orderDate(a.createdAt).getMonth() +
            "/" +
            orderDate(a.createdAt).getDate());
        const bDate =
          orderDate(b.createdAt).getFullYear() +
          "/" +
          (orderDate(b.createdAt).getMonth() +
            "/" +
            orderDate(b.createdAt).getDate());
        return aDate < bDate ? 1 : -1;
        // return orderDate(a.createdAt).getFullYear() <
        //   orderDate(b.createdAt).getFullYear()
        //   ? 1
        //   : -1;
      });
      setOrders(sorted);
      setSortOrder(order);
      console.log(sorted);
    }
  };

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
        <div className="maindiv text-black pt-0 mt-10 z-0">
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

              <div className="flex items-center gap-4 text-lg font-ubuntu mb-2 relative">
                <span className="text-xl">Sort By</span>{" "}
                <BsFilterSquare
                  className="cursor-pointer font-bold"
                  onClick={showOptions}
                />
                <div
                  className={`options absolute top-7 shadow-md shadow-gray-600 left-20 text-black border-2 flex flex-col bg-slate-100 font-firasans transition-all duration-500 ease-in-out transform ${
                    options === true
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-96"
                  }`}
                >
                  <button
                    className={`px-4 py-2 hover:bg-slate-200 ${
                      sortOrder === "oldFirst" && "bg-slate-300"
                    }`}
                    onClick={() => {
                      setOptions(false);
                      sorting("oldFirst");
                    }}
                  >
                    <span>Oldest First</span>
                    {sortOrder === "oldFirst" && (
                      <span className="font-medium text-blue-800">
                        {" "}
                        &#10003;
                      </span>
                    )}
                  </button>
                  <button
                    className={`px-4 py-2 hover:bg-slate-200 ${
                      sortOrder === "newFirst" && "bg-slate-300"
                    }`}
                    onClick={() => {
                      setOptions(false);
                      sorting("newFirst");
                    }}
                  >
                    <span>Newest First</span>
                    {sortOrder === "newFirst" && (
                      <span className="font-medium text-blue-800">
                        {" "}
                        &#10003;
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {orders.length > 0 && (
                <div className="overflow-x-auto shadow-md shadow-gray-500/30 mb-10">
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
                          Date
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
                              {orderDate(item?.createdAt).toLocaleDateString()}
                              <br />
                              {orderDate(item?.createdAt).toLocaleTimeString()}
                            </td>
                            <td className="py-4 px-6 border-2 border-gray-700">
                              <span
                                className={`py-1 px-4 rounded-sm text-white ${
                                  item?.status === "Pending"
                                    ? "bg-yellow-500"
                                    : ""
                                } ${
                                  item?.status === "Paid"
                                    ? "bg-yellow-600/80"
                                    : ""
                                } `}
                              >
                                {item?.status}
                              </span>
                            </td>
                            <td
                              className={`py-4 px-6 border-2 border-gray-700 `}
                            >
                              <span
                                className={`py-1 px-4 rounded-sm flex items-center justify-center text-center text-white ${
                                  item?.deliveryStatus === "Order Placed"
                                    ? "bg-yellow-600"
                                    : ""
                                } ${
                                  item?.deliveryStatus === "Shipped"
                                    ? "bg-blue-900"
                                    : ""
                                } ${
                                  item?.deliveryStatus === "Delivered"
                                    ? "bg-yellow-400"
                                    : ""
                                } ${
                                  item?.deliveryStatus === "In Transit"
                                    ? "bg-indigo-600"
                                    : ""
                                } ${
                                  item?.deliveryStatus === "Processing"
                                    ? "bg-orange-600"
                                    : ""
                                }  `}
                              >
                                {item?.deliveryStatus}
                              </span>
                            </td>
                            <td className="py-4 px-6 border-2 border-gray-700">
                              {item?.address}
                            </td>
                            <td className="py-4 px-6 border-2 border-gray-700">
                              <div className="flex space-x-3">
                                <Link
                                  href={"/admin/order?id=" + item?._id}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
