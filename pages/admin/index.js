import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { CgDollar } from "react-icons/cg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MdShoppingCart } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

const Index = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();

  const data01 = [
    {
      name: "Tshirts",
      value: 400,
    },
    {
      name: "Books",
      value: 300,
    },
    {
      name: "Mugs",
      value: 300,
    },
    {
      name: "Pants",
      value: 200,
    },
    {
      name: "Hoodies",
      value: 278,
    },
    {
      name: "Electronics",
      value: 189,
    },
  ];

  const data = [
    {
      name: "Jan",
      amt: 24000,
      sales: 10,
    },
    {
      name: "Feb",
      amt: 23450,
      sales: 20,
    },
    {
      name: "Mar",
      amt: 15000,
      sales: 50,
    },
    {
      name: "Apr",
      amt: 100000,
      sales: 70,
    },
    {
      name: "May",
      amt: 100000,
      sales: 230,
    },
    {
      name: "Jun",
      amt: 100000,
      sales: 80,
    },
    {
      name: "Jul",
      amt: 100000,
      sales: 70,
    },
    {
      name: "Aug",
      amt: 100000,
      sales: 40,
    },
    {
      name: "Sep",
      amt: 100000,
      sales: 70,
    },
    {
      name: "Oct",
      amt: 100000,
      sales: 20,
    },
    {
      name: "Nov",
      amt: 100000,
      sales: 100,
    },
    {
      name: "Dec",
      amt: 100000,
      sales: 140,
    },
  ];

  const salesData = [
    {
      name: "Jan",
      revenue: 20000,
      orders: 3000,
    },
    {
      name: "Feb",
      revenue: 10000,
      orders: 2000,
    },
    {
      name: "Mar",
      revenue: 12000,
      orders: 5000,
    },
    {
      name: "Apr",
      revenue: 22000,
      orders: 8000,
    },
    {
      name: "May",
      revenue: 50000,
      orders: 12000,
    },
    {
      name: "Jun",
      revenue: 100000,
      orders: 20000,
    },
    {
      name: "Jul",
      revenue: 120000,
      orders: 30000,
    },
    {
      name: "Aug",
      revenue: 150000,
      orders: 50000,
    },
    {
      name: "Sep",
      revenue: 200000,
      orders: 100000,
    },
    {
      name: "Oct",
      revenue: 90000,
      orders: 20000,
    },
    {
      name: "Nov",
      revenue: 100000,
      orders: 50000,
    },
    {
      name: "Dec",
      revenue: 100000,
      orders: 20000,
    },
  ];

  function currencyFormat(num) {
    return "Rs. " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "black", "purple"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <style jsx global>{`
        footer,
        nav {
          display: none;
        }
        body {
          background: #f7f7f7;
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
        className={`main pl-0 transition-all duration-300 mt-20 mx-10 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="maindiv text-black pt-0 mt-10">
          <h1 className="my-4 font-roboto text-2xl text-blue-700">DASHBOARD</h1>
          <div className="flex cardContainer gap-4 justify-center items-center flex-wrap">
            <Card
              sx={{
                background: "#ffffff",
                minWidth: 275,
                width: 300,
                height: 100,
              }}
              className={"border-none rounded-md"}
            >
              <CardContent className="flex justify-start space-x-6 items-center">
                <div className="border-8 border-green-200 p-4 rounded-full bg-yellow-500">
                  <CgDollar className="text-xl shadow-lg text-white" />
                </div>
                <div className="flex flex-col">
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Sales
                  </Typography>
                  <Typography color="text.secondary">
                    {currencyFormat(20000)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                background: "#ffffff",
                minWidth: 275,
                width: 300,
                height: 100,
              }}
            >
              <CardContent className="flex justify-start space-x-6 items-center">
                <div className="border-8 border-green-200 p-4 rounded-full bg-yellow-500">
                  <MdShoppingCart className="text-xl shadow-lg text-white" />
                </div>
                <div className="flex flex-col">
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Orders
                  </Typography>
                  <Typography color="text.secondary">3023</Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                background: "#ffffff",
                minWidth: 275,
                width: 300,
                height: 100,
              }}
            >
              <CardContent className="flex justify-start space-x-6 items-center">
                <div className="border-8 border-green-200 p-4 rounded-full bg-yellow-500">
                  <FaBoxOpen className="text-xl shadow-lg text-white" />
                </div>
                <div className="flex flex-col">
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Products
                  </Typography>
                  <Typography color="text.secondary">123</Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                background: "#ffffff",
                minWidth: 275,
                width: 300,
                height: 100,
              }}
            >
              <CardContent className="flex justify-start space-x-6 items-center">
                <div className="border-8 border-green-200 p-4 rounded-full bg-yellow-500">
                  <CgDollar className="text-xl shadow-lg text-white" />
                </div>
                <div className="flex flex-col">
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Revenue
                  </Typography>
                  <Typography color="text.secondary">
                    {currencyFormat(34538334)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-12 gap-4 mx-0 lg:mx-8 overflow-y-hidden">
            <div className="h-[350px] border pr-2 sm:p-4 my-6 shadow-lg bg-slate-50 pb-16 rounded-md col-span-12 lg:col-span-4">
              <h2 className="text-center text-xl font-robotoslab">
                Monthly Sales
              </h2>
              <p className="text-right font-firasans text-sm">In units</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[350px] border pr-2 sm:p-4 my-6 shadow-lg bg-slate-50 pb-16 rounded-md col-span-12 lg:col-span-8">
              <h2 className="text-center text-xl font-robotoslab">
                Revenue vs Orders
              </h2>
              <p className="text-right font-firasans text-sm">In units</p>
              <ResponsiveContainer width="100%" height="100%" className={""}>
                <LineChart
                  width={500}
                  height={300}
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff0000"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#ff00aa"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-12 sm:gap-4 mx-0 lg:mx-8 overflow-y-hidden">
            <div className="salesStatistics h-[300px] py-6 my-5 bg-white border shadow-lg pb-10 col-span-12 lg:col-span-8">
              <h2 className="my-3 text-left ml-4 text-xl font-robotoslab">
                Sales Statistics
              </h2>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  width={500}
                  height={300}
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884fa" />
                  <Bar dataKey="orders" fill="#d3deed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-12 my-4 lg:col-span-4 border h-[300px] shadow-lg bg-white">
              <h2 className="font-firasans text-xl text-center my-2">
                Highest Selling Products
              </h2>
              <ResponsiveContainer>
                <PieChart width={"100%"} height={"100%"}>
                  <Legend verticalAlign="top" height={36} />
                  <Tooltip />
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="40%"
                    outerRadius={50}
                    fill="#8884d8"
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
