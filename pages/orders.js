import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchorders = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/myorders`,
        { data: token }
      );
      // console.log(response.data);
      if (response.data.success === true) {
        setOrders(response.data.orders);
      }
    };
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchorders();
    }
  }, []);
  // console.log(orders.length);

  const deleteOrder = async (id) =>{
    if(confirm("Are you sure want to delete this order: ")){
      setOrders(orders.filter((item) =>{
        return item._id !== id;
      }))
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/deleteorder`, {data: id});
      console.log(response.data);
      if(response.data.success === true){
        toast.success("Order successfully deleted");
      }
    }
  }
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
                return (
                  <tr
                    key={item?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-firasans"
                  >
                    <td className="py-4 px-6">{index+1}</td>
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
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Pay
                          </button>
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
    </div>
  );
};

export default Orders;
