import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../helpers/baseUrl";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [dataLimit, setDataLimit] = useState(5);
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    const fetchorders = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/api/myorders`, {
        data: { token, dataLimit },
      });
      console.log(response.data);
      if (response.data.success === true) {
        if (response.data.remaining === true) {
          setRemaining(true)
          setOrders(response.data.orders);
        } else {
          setRemaining(false);
          setOrders(response.data.orders);
        }
      }
    };
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchorders();
    }
  }, [dataLimit]);
  // console.log(orders.length);

  const deleteOrder = async (id) => {
    if (confirm("Are you sure want to delete this order: ")) {
      setOrders(
        orders.filter((item) => {
          return item._id !== id;
        })
      );
      const response = await axios.delete(`${baseUrl}/api/deleteorder`, {
        data: id,
      });
      // console.log(response.data);
      if (response.data.success === true) {
        toast.success("Order successfully deleted");
      }
    }
  };

  return (
    <div className="container w-[96%] sm:w-[90%] mx-auto">
      <h1 className="font-roboto text-2xl text-center my-6 text-pink-700">
        My Orders
      </h1>

      {orders.length === 0 && (
        <div className=" text-center text-red-900 font-roboto text-lg">
          {" "}
          No orders found! 😖{" "}
        </div>
      )}

      {orders.length > 0 && (
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
                  Tracking Id
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
                    <td className="py-4 px-6">{item?.trackingId}</td>
                    <td className="py-4 px-6">Rs.{item?.amount}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`py-2 px-8 ${
                          item?.status === "Paid"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-400 text-white"
                        }  rounded-sm font-medium font-ubuntu`}
                      >
                        {item?.status}
                      </span>
                    </td>
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
      )}

      {orders.length !== 0 && <button
        className={`py-2 mb-8 px-6 shadow-md bg-pink-500 hover:bg-pink-700 font-ubuntu text-lg text-white rounded-sm ${
          remaining === false &&
          "cursor-not-allowed shadow-none bg-pink-300 hover:bg-pink-300"
        }`}
        onClick={() => {
          setDataLimit(dataLimit + 5);
        }}
        disabled={remaining === false && true}
      >
        <span>{remaining === true ? "Load More Data" : "All Data Loaded"}</span>
      </button>}
    </div>
  );
};

export default Orders;
