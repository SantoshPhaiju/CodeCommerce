import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { BsArrowUpRight, BsArrowDownRight, BsCartCheck } from "react-icons/bs";
import { RiShoppingBag2Line } from "react-icons/ri";
import { FaArrowsAltH } from "react-icons/fa";
import { BiGroup } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import BarChart from "../../components/BarChart";
import PieChart from "./PieChart";

const Index = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
  const router = useRouter();
  let admintoken;

  const OrderData = [
    {
      id: 1,
      month: "Baisakh",
      totalOrdersReceived: 99,
    },
    {
      id: 2,
      month: "Jestha",
      totalOrdersReceived: 123,
    },
    {
      id: 3,
      month: "Asar",
      totalOrdersReceived: 39,
    },
    {
      id: 4,
      month: "Shrawan",
      totalOrdersReceived: 49,
    },
    {
      id: 5,
      month: "Bhadra",
      totalOrdersReceived: 65,
    },
    {
      id: 6,
      month: "Asoj",
      totalOrdersReceived: 72,
    },
    {
      id: 7,
      month: "Kartik",
      totalOrdersReceived: 129,
    },
    {
      id: 8,
      month: "Mangsir",
      totalOrdersReceived: 9,
    },
    {
      id: 9,
      month: "Poush",
      totalOrdersReceived: 12,
    },
    {
      id: 10,
      month: "Magh",
      totalOrdersReceived: 25,
    },
  ];

  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 1023,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 3245,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 5555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 1555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 22300,
      userLost: 15234,
    },
    {
      id: 6,
      year: 2021,
      userGain: 83000,
      userLost: 2324,
    },
    {
      id: 7,
      year: 2022,
      userGain: 43700,
      userLost: 2434,
    },
    {
      id: 8,
      year: 2023,
      userGain: 42300,
      userLost: 2234,
    },
    {
      id: 9,
      year: 2024,
      userGain: 34300,
      userLost: 1234,
    },
  ];

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
    admintoken = localStorage.getItem("admin-token");
  }

  // #e60049 #0bb4ff #50e991 #e6d800 #9b19f5 #ffa300 #dc0ab4 #b3d4ff #00bfa0

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: " #e6d800",
        // borderColor: "rgba(0, 0, 0, 1)",
        // borderWidth: 1,
        // borderRadius: 2,
      },
      {
        label: "Users Lost",
        data: UserData.map((data) => data.userLost),
        backgroundColor: "#e60049",
        // borderColor: "rgba(0, 0, 0, 1)",
        // borderWidth: 1,
        // borderRadius: 2,
      },
    ],
  });
  const [ordersData, setOrdersData] = useState({
    labels: OrderData.map((data) => data.month),
    datasets: [
      {
        label: "Total Orders",
        data: OrderData.map((data) => data.totalOrdersReceived),
        backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#00bfa0", "#50e991", "#e6d800", "#ffa300", "#dc0ab4", "#9b19f5"],
        // borderColor: "rgba(0, 0, 0, 1)",
        // borderWidth: 1,
        // borderRadius: 2,
      },
    ],
  });

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
          <div className="dashboard py-4">
            <div className="container w-[96%] sm:w-[90%] mx-auto z-0">
              <h1 className="font-rubik text-3xl my-2 text-black">
                Admin Dashboard, Welcome Admin
              </h1>

              <div className="w-full gap-2 xl:gap-0 h-auto flex flex-wrap flex-row items-center justify-center">
                <div className="sales w-full sm:w-3/4 md:w-[49%] xl:w-[25%] my-2 py-4 px-6 rounded-lg xl:rounded-l-lg xl:rounded-r-none cursor-pointer bg-blue-100 hover:bg-blue-300 xl:border-r border-gray-400 h-[22vh]">
                  <div className="text-black flex gap-4 items-center">
                    <div className="rounded-full p-1 bg-black">
                      <RiShoppingBag2Line className="text-white" />
                    </div>
                    <span className="text-lg font-roboto text-gray-700">
                      Total Sales
                    </span>
                  </div>
                  <p className="text-2xl font-medium font-rubik text-gray-800 my-4">
                    Rs.100,000.98
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center font-bold font-robotoslab text-white px-2 rounded-sm bg-yellow-500">
                      <BsArrowUpRight className="font-bold" />
                      <span>20.9%</span>
                    </div>
                    <div className="font-medium font-robotoslab text-gray-500">
                      <span>+18.5K this month</span>
                    </div>
                  </div>
                </div>

                <div className="orders w-full sm:w-3/4 md:w-[49%] xl:w-[25%] my-2 py-4 px-6 rounded-lg xl:rounded-none cursor-pointer bg-blue-100 hover:bg-blue-300 border-r border-gray-400 h-[22vh]">
                  <div className="text-black flex gap-4 items-center">
                    <div className="rounded-full p-1 bg-black">
                      <BsCartCheck className="text-white" />
                    </div>
                    <span className="text-lg font-roboto text-gray-700">
                      Total Orders
                    </span>
                  </div>
                  <p className="text-2xl font-medium font-rubik text-gray-800 my-4">
                    1,234
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center font-bold font-robotoslab text-white px-2 rounded-sm bg-red-900">
                      <BsArrowDownRight className="font-bold" />
                      <span>5.4%</span>
                    </div>
                    <div className="font-medium font-robotoslab text-gray-500">
                      <span>-253 this month</span>
                    </div>
                  </div>
                </div>
                <div className="customers w-full sm:w-3/4 md:w-[49%] xl:w-[25%] my-2 py-4 px-6 rounded-lg xl:rounded-none cursor-pointer bg-blue-100 hover:bg-blue-300 border-r border-gray-400 h-[22vh]">
                  <div className="text-black flex gap-4 items-center">
                    <div className="rounded-full p-1 bg-black">
                      <BiGroup className="text-white" />
                    </div>
                    <span className="text-lg font-roboto text-gray-700">
                      New Customers
                    </span>
                  </div>
                  <p className="text-2xl font-medium font-rubik text-gray-800 my-4">
                    3245
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center font-bold font-robotoslab text-white bg-blue-600 px-2">
                      <FaArrowsAltH className="font-bold" />
                      <span>0%</span>
                    </div>
                    <div className="font-medium font-robotoslab text-gray-500">
                      <span>+0 this month</span>
                    </div>
                  </div>
                </div>
                <div className="pendingOrders w-full sm:w-3/4 md:w-[49%] xl:w-[25%] my-2 py-4 px-6 rounded-lg xl:rounded-l-none xl:rounded-r-lg cursor-pointer bg-blue-100 hover:bg-blue-300 border-r border-gray-400 h-[22vh]">
                  <div className="text-black flex gap-4 items-center">
                    <div className="rounded-full p-1 bg-black">
                      <MdLocalShipping className="text-white" />
                    </div>
                    <span className="text-lg font-roboto text-gray-700">
                      Pending Orders
                    </span>
                  </div>
                  <p className="text-2xl font-medium font-rubik text-gray-800 my-4">
                    24
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center font-bold font-robotoslab text-white bg-yellow-500 px-2">
                      <BsArrowUpRight className="font-bold" />
                      <span>59.02%</span>
                    </div>
                    <div className="font-medium font-robotoslab text-gray-500">
                      <span>+8 this week</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="charts w-full p-4 my-4 flex flex-wrap gap-4 items-center justify-center bg-slate-50">
                <div className="barchart w-full xl:w-[65%] border-2 p-2 bg-white rounded-md">
                  <BarChart chartData={userData} />
                </div>
                <div className="piechart w-full xl:w-[33%] border-2 p-2 bg-white rounded-md">
                  <PieChart chartData={ordersData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
