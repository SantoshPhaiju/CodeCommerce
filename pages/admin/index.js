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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Index = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();

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
        className={`main pl-0 transition-all duration-300 mt-20 mx-10 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="maindiv text-black pt-0 mt-10">
          <h1 className="my-4 font-roboto text-2xl text-blue-700">DASHBOARD</h1>
          <Card
            sx={{
              background: "#ffaaff",
              minWidth: 275,
              width: 300,
              height: 200,
              boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2"></Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined">
                Learn More
              </Button>
            </CardActions>
          </Card>

<div className="flex space-x-4">

          <div className="h-[350px] w-[300px] sm:w-[500px] border pr-2 sm:p-4 my-6 shadow-lg bg-purple-50 sm:pb-16 rounded-md">
            <h2 className="text-center text-xl font-robotoslab">
              Monthly Sales
            </h2>
            <p className="text-right font-firasans text-sm">In units</p>
            <ResponsiveContainer width="100%" height="100%" className={""}>
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

          <div className="h-[350px] w-[300px] sm:w-[800px] border pr-2 sm:p-4 my-6 shadow-lg   sm:pb-16 rounded-md">
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
</div>
      </div>
    </>
  );
};

export default Index;
