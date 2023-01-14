import mongoose from "mongoose";
import { useRouter } from "next/router";
import React from "react";
import Order from "../models/Order";
import { AiTwotonePhone } from "react-icons/ai";
import {TiTick} from "react-icons/ti"

const TrackOrder = ({ order }) => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  const steps = [
    "Order Placed",
    "Processing",
    "In Transit",
    "Shipped",
    "Delivered",
  ];
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
            <div className="stepper flex justify-between px-8 py-2 mt-12 relative">
              {steps?.map((step, index) => {
                return (
                  <div key={index} className={"step-item mt-8"}>
                    <div className="bar h-[3px] bg-slate-200 w-full absolute top-0 left-0"></div>
                    <div className="progress h-[3px] bg-green-500 w-[50%] absolute top-0 left-0"></div>
                    <div className="circle rounded-full border w-[40px] h-[40px] flex justify-center items-center absolute -top-5  font-bold z-20 ml-5 bg-yellow-500">
                      {/* {index + 1} */}
                      <TiTick className="text-2xl text-black" />
                    </div>
                    <p className="text-lg font-firasans">{step}</p>
                  </div>
                );
              })}
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
