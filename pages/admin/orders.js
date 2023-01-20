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
import { deleteOrder } from "../slices/orderSlice";
import { toast } from "react-toastify";
// import Table from "../../components/Table";
// import {tableData} from "../../components/dummyTableData";
import DataTable from "react-data-table-component";

const Orders = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("oldFirst");
  const [options, setOptions] = useState(false);
  const sideBarRef = useRef();
  const ordersSelState = useSelector((state) => state.order.orders);
  const [orders, setOrders] = useState("");
  const [dataLimit, setDataLimit] = useState(5);
  const remaining = useSelector((state) => state.order.remaining);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const [page, setPage] = useState(0);

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
    dispatch(fetchOrders({ token: admintoken, dataLimit, page }));
  }, [dataLimit, page]);

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
        return aDate > bDate ? 1 : -1;
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

  const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
      // use the selector function to resolve your field names by passing the sort comparitors
      const aField = selector(rowA);
      const bField = selector(rowB);
      const aDate =
        orderDate(aField.createdAt).getFullYear() +
        "/" +
        (orderDate(aField.createdAt).getMonth() +
          "/" +
          orderDate(aField.createdAt).getDate());
      const bDate =
        orderDate(bField.createdAt).getFullYear() +
        "/" +
        (orderDate(bField.createdAt).getMonth() +
          "/" +
          orderDate(bField.createdAt).getDate());
      // console.log(aDate, bDate);

      let comparison = 0;

      if (aDate > bDate) {
        comparison = 1;
      } else if (aDate < bDate) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      // return aDate > bDate ? 1 : -1;
      return direction === "desc" ? comparison * -1 : comparison;
    });
  };

  const deleteSingleOrder = (id) => {
    dispatch(deleteOrder({ id, toast }));
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    // console.log(e.target.value);
    // console.log(
    //   orders.filter((order, index) => {
    //     return order.email.toLowerCase().includes(e.target.value);
    //     // return order.email.indludes(e.target.value);
    //   })
    // );
    // if (query !== "") {
    //   setOrders(
    //     orders.filter((order, index) => {
    //       return order.email.toLowerCase().includes(query.toLowerCase());
    //       // return order.email.indludes(e.target.value);
    //     })
    //   );
    // } else {
    //   setOrders(ordersSelState);
    // }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => (
        <Link className="link" href={"/admin/orders"}>
          #{row._id}
        </Link>
      ),
    },
    { name: "Name", selector: (row) => row.name },
    {
      name: "Date",
      selector: (row) => (
        <span>{orderDate(row.createdAt).toLocaleDateString()}</span>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <span className="bg-yellow-500 text-white py-2 px-4 text-lg">
          {row.email}
        </span>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "30px",
        fontFamily: "roboto",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontFamily: "roboto",
        color: "blue",
      },
    },
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
          <div className="ordersTable py-8">
            <div className="container w-[96%] sm:w-[90%] mx-auto z-0">
              <h1 className="font-roboto text-2xl text-center my-2 text-pink-700">
                All Orders
              </h1>

              {orders.length === 0 && (
                <div className=" text-center text-red-900 font-roboto text-lg">
                  {" "}
                  No orders found! 😖{" "}
                </div>
              )}

              <div className="searchandsort flex items-center justify-between">
                <div className="relative flex items-center gap-4 text-lg font-ubuntu mb-2 z-0">
                  <span className="text-xl z-0">Sort By</span>{" "}
                  <BsFilterSquare
                    className="cursor-pointer font-bold"
                    onClick={showOptions}
                  />
                  <div
                    className={`options w-[200px] absolute top-7 shadow-md shadow-gray-600 left-20 text-black border-2 flex flex-col bg-slate-100 font-firasans transition-all duration-500 ease-in-out transform ${
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

                <div className="search">
                  <div className="formGroup">
                    <p className="text-xs flex flex-wrap w-[250px] text-red-400 font-firasans">
                      Search by amount, email, orderId, status and
                      deliverystatus
                    </p>
                    <input
                      name="query"
                      value={query}
                      onChange={handleSearchChange}
                      className="py-2 px-4 font-firasans border-2 mb-2 mr-2 rounded-sm text-lg border-gray-400 outline-gray-600"
                      type="text"
                      placeholder="Search......"
                    />
                  </div>
                </div>
              </div>

              {orders.length > 0 && (
                <div className="overflow-x-auto shadow-md shadow-gray-500/30 mb-3">
                  <table className="border-collapse border border-gray-900 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-base font-firasans text-white bg-indigo-900 uppercase dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          S.N.
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Order Id
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          email
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Delivery Status
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="py-4 px-6 border-2 border-gray-700 text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter((order) => {
                          return (
                            order.email
                              .toLowerCase()
                              .includes(query.toLowerCase()) ||
                            order.orderId
                              .toLowerCase()
                              .includes(query.toLowerCase()) ||
                            order.amount.toString() === query ||
                            order.status
                              .toLowerCase()
                              .includes(query.toLocaleLowerCase()) ||
                            order.deliveryStatus
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          );
                        })
                        .map((item, index) => {
                          // console.log(item);
                          return (
                            <tr
                              key={index}
                              className="bg-white dark:bg-gray-800 dark:border-gray-700 text-center font-firasans hover:bg-blue-200/80 cursor-pointer odd:bg-gray-200 even:bg-white"
                            >
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                {index + 1}
                              </td>
                              <td
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline border-2 border-gray-700 text-center"
                              >
                                <Link href={"/order?id=" + item?._id}>
                                  # {item?.orderId}
                                </Link>
                              </td>
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                {item?.email}
                              </td>
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                Rs.{item?.amount}
                              </td>
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                {orderDate(
                                  item?.createdAt
                                ).toLocaleDateString()}
                                <br />
                                {orderDate(
                                  item?.createdAt
                                ).toLocaleTimeString()}
                              </td>
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
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
                                className={`py-4 px-6 border-2 border-gray-700 text-center `}
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
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                {item?.address}
                              </td>
                              <td className="py-4 px-6 border-2 border-gray-700 text-center">
                                <div className="flex space-x-3">
                                  <Link
                                    href={"/admin/order?id=" + item?._id}
                                    className="font-medium rounded-sm flex items-center justify-center space-x-1 py-2 px-3 bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-110"
                                  >
                                    <AiOutlineEye className="text-lg" />
                                    <span>View</span>
                                  </Link>
                                  <button
                                    onClick={() => deleteSingleOrder(item?._id)}
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
              {/* <button
                className={`py-2 px-6 shadow-md bg-pink-500 hover:bg-pink-700 font-ubuntu text-lg text-white rounded-sm ${
                  remaining === false &&
                  "cursor-not-allowed shadow-none bg-pink-300 hover:bg-pink-300"
                }`}
                onClick={() => {
                  setDataLimit(dataLimit + 5);
                }}
                disabled={remaining === false && true}
              >
                <span>
                  {remaining === true ? "Load More Data" : "All Data Loaded"}
                </span>
              </button> */}
              <div className="downTableDetails flex justify-start items-center gap-4 text-lg font-ubuntu text-gray-600">
                <div>Page: {page}</div>|
                <span>
                  Showing {dataLimit * page + orders.length} of {totalOrders}{" "}
                  results.
                </span>
              </div>
              <div className="paginationButtons flex items-center gap-5 my-3">
                <button
                  className={`py-2 px-6 shadow-md bg-pink-500 hover:bg-pink-700 font-ubuntu text-lg text-white rounded-sm ${
                    page === 0 &&
                    "cursor-not-allowed shadow-none bg-pink-300 hover:bg-pink-300"
                  }`}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={page === 0 && true}
                >
                  <span>{remaining === true ? "Previous" : "Previous"}</span>
                </button>
                <button
                  className={`py-2 px-6 shadow-md bg-pink-500 hover:bg-pink-700 font-ubuntu text-lg text-white rounded-sm ${
                    remaining === false &&
                    "cursor-not-allowed shadow-none bg-pink-300 hover:bg-pink-300"
                  }`}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={remaining === false && true}
                >
                  <span>{remaining === true ? "Next" : "Next"}</span>
                </button>
              </div>
            </div>

            {/* <Table tableData={tableData} columns={columns} />*/}

            <DataTable
              data={orders}
              columns={columns}
              customStyles={customStyles}
              pagination={true}
              striped={true}
              sortFunction={customSort}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
