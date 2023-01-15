import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";
import { AiTwotonePhone } from "react-icons/ai";
import dynamic from "next/dynamic";

const StepperComponent = dynamic(() => import("../components/CustomStepper"), {
  ssr: false,
});

const TrackOrder = ({ order }) => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);

  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if(order.deliveryStatus === "Order Placed"){
      setActiveStep(0);
    }
    if(order.deliveryStatus === "Processing"){
      setActiveStep(1);
    }
    if(order.deliveryStatus === "In Transit"){
      setActiveStep(2);
    }
    if(order.deliveryStatus === "Shipped"){
      setActiveStep(3);
    }
    if(order.deliveryStatus === "Delivered"){
      setActiveStep(4);
    }

  });
  
  return (
    <>
      <div className="mainDiv min-h-[80vh]">
        <div className="my-10 bg-white mx-[100px] h-auto shadow-md border border-t-gray-300">
          <div className="header px-8 flex items-center py-2">
            <h1 className="font-bold font-robotoslab text-2xl">
              Track your order{" "}
            </h1>
          </div>
          <hr className="border-gray-400" />
          <div className="body px-8 py-2">
            <h2 className="text-xl font-rubik font-medium">
              Order Id: #{order.orderId}
            </h2>
            <div className="border py-4 px-10 my-3 flex flex-wrap gap-2 justify-between items-start">
              <div className="font-ubuntu text-lg">
                <div>Estimated Delivery Time: </div>
                <div>29 Nov, 2023</div>
              </div>
              <div className="font-ubuntu text-lg">
                <div>Shipping By: </div>
                <div>
                  {order.address} <br />{" "}
                  <AiTwotonePhone className="inline-block text-xl text-green-800" />{" "}
                  +977, {order.phone}
                </div>
              </div>
              <div className="font-ubuntu text-lg">
                <div>Delivery Status: </div>
                <div>{order.deliveryStatus}</div>
              </div>
              <div className="font-ubuntu text-lg">
                <div>Tracking Id: </div>
                <div>{order._id}</div>
              </div>
            </div>
            <div className="stepper flex justify-between py-2 mt-12 w-full">
              <StepperComponent active={activeStep} />
            </div>
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
  // console.log(order);
  if (order === null) {
    order = {};
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default TrackOrder;
