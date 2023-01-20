import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import Order from "../../models/Order";
// import Link from "next/link";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateOrder } from "../slices/orderSlice";
import { toast } from "react-toastify";

const OrderPage = ({ order }) => {
  // console.log("order", order);
  const router = useRouter();
  const { id } = router.query;
  if (order === {}) {
    router.push("/admin/orders");
  }
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
  const [orderState, setOrderState] = useState(order.deliveryStatus);
  const dispatch = useDispatch();
  const [orderDelivery, setOrderDelivery] = useState(order.deliveryStatus);

  // Get the orderDate in date format of javascript to convert it to localestring
  const orderDate = (createdAt) => {
    return new Date(createdAt);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setOrderState(e.target.value);
    // console.log(orderState);
  };
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleUpdate = () => {
    console.log(id);
    dispatch(updateOrder({ id, orderState, toast }));
    setOrderDelivery(orderState);
    refreshData();
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
        className={`main pl-0 transition-all duration-300 mt-24 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="bg-gray-100 p-4 mx-10">
          <div className="font-medium mb-2 text-3xl font-roboto">
            Order Details:
          </div>
          <div className="bg-white p-4 rounded-lg grid md:grid-cols-12 gap-8 md:gap-2">
            <div className="orderDetail col-span-12 md:col-span-5 border-2 p-4 md:border-none md:p-0">
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
                <div className="text-gray-800 font-bold bg-gray-200 rounded-sm cursor-not-allowed px-2 py-2">
                  {orderDate(order.createdAt).toLocaleDateString()}{" "}
                  {orderDate(order.createdAt).toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center mb-4 font-firasans text-lg">
                <div className="text-gray-600 mr-2">Total:</div>
                <div className="text-blue-600 font-bold">Rs.{order.amount}</div>
              </div>
            </div>

            <div className="shippingDetails col-span-12 md:col-span-7 border-2 p-4 md:border-none md:p-0">
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
                <div className="text-gray-600">
                  {order.state} Province, {order.city}
                </div>
              </div>
              <div className="flex items-center font-firasans text-base">
                <div className="text-gray-600">{order.phone}</div>
              </div>
              <br />
              <div className="editOrder text-xl font-firasans">
                {orderDelivery !== "Delivered" && (
                  <h2>Change the Delivery Status: </h2>
                )}
                {orderDelivery !== "Delivered" ? (
                  <>
                    <select
                      className={`w-[250px] transition-all duration-300 mt-4 px-3 py-2 pr-4 border ${
                        order.status === "Pending"
                          ? "cursor-not-allowed border-gray-400"
                          : "border-black"
                      }`}
                      name="dStatus"
                      id="dStatus"
                      defaultValue={orderState}
                      onChange={handleChange}
                      disabled={order.status === "Pending" && true}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      className={`py-2 px-10 ml-6 rounded-sm bg-pink-500 text-white hover:bg-pink-700 shadow-md shadow-gray-500 ${
                        order.status === "Pending" &&
                        "shadow-none bg-pink-300 hover:bg-pink-300 cursor-not-allowed"
                      }`}
                      onClick={handleUpdate}
                      disabled={order.status === "Pending" && true}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="bg-yellow-600 text-white py-2 px-8 w-[350px] rounded-sm cursor-not-allowed">
                    Order Delivered at{" "}
                    {orderDate(order?.deliveryDate).toLocaleDateString()} &nbsp;
                    &nbsp;
                    {orderDate(order?.deliveryDate).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2 className="mt-10 mb-4 text-2xl font-roboto">
            Ordered Products Details:-{" "}
          </h2>

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
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 border-2 border-gray-700"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 border-2 border-gray-700"
                  >
                    Qty
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
                    Image
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 border-2 border-gray-700"
                  >
                    Ordered Date
                  </th>
                  {/* <th
                    scope="col"
                    className="py-4 px-6 border-2 border-gray-700"
                  >
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {Object.keys(order).length !== 0 ? (
                  Object.keys(order?.products).map((item, index) => {
                    // console.log(item);
                    return (
                      <tr
                        key={index}
                        className="bg-white dark:bg-gray-800 dark:border-gray-700 font-firasans text-base"
                      >
                        <td className="py-4 px-6 border-2 border-gray-700">
                          {index + 1}
                        </td>
                        <td
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border-2 border-gray-700"
                        >
                          {order.products[item].name}
                        </td>
                        <td className="py-4 px-6 border-2 border-gray-700">
                          Rs.{order.products[item].price}
                        </td>
                        <td className="py-4 px-6 border-2 border-gray-700">
                          {order.products[item].qty}
                        </td>
                        <td className="py-4 px-6 border-2 border-gray-700">
                          Rs.
                          {order.products[item].price *
                            order.products[item].qty}
                        </td>
                        <td className={`py-4 px-2 border-2 border-gray-700 `}>
                          <div className="imagecontainer w-full h-[12vh]">
                            <img
                              src={order.products[item].img}
                              alt="Image here"
                              className="object-contain object-top w-full h-full"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 border-2 border-gray-700">
                          {orderDate(order?.createdAt).toLocaleDateString()}
                          <br />
                          {orderDate(order?.createdAt).toLocaleTimeString()}
                        </td>
                        {/* <td className="py-4 px-6 border-2 border-gray-700"></td> */}
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-red-700 text-2xl text-center font-ubuntu font-bold my-5">
                    Invalid Order Id
                  </div>
                )}
              </tbody>
            </table>
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
  console.log(order);
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
