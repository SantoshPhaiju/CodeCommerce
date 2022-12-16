import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";

const Index = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
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
          <h1 className="my-4 font-roboto text-2xl text-blue-700">DASHBOARD</h1>
          <Card sx={{ background: "#ffaaff", minWidth: 275, width: 300, height: 200, boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.3)" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Index;
