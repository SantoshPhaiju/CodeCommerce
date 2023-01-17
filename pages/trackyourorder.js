import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiTwotonePhone } from "react-icons/ai";
import { toast } from "react-toastify";
import baseUrl from "../helpers/baseUrl";
import { v4 as uuidv4 } from "uuid";


const TrackYourOrder = () => {
  console.log(uuidv4());
  const [order, setOrder] = useState([]);
  const [trackData, setTrackData] = useState({
    email: "",
    trackingId: ""
  })
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (order.deliveryStatus === "Order Placed") {
      setActiveStep(0);
    }
    if (order.deliveryStatus === "Processing") {
      setActiveStep(1);
    }
    if (order.deliveryStatus === "In Transit") {
      setActiveStep(2);
    }
    if (order.deliveryStatus === "Shipped") {
      setActiveStep(3);
    }
    if (order.deliveryStatus === "Delivered") {
      setActiveStep(4);
    }
  });
  const steps = [
    "Order Placed",
    "Processing",
    "In Transit",
    "Shipped",
    "Delivered",
  ];

  const newSteps = [
    {
      description: "Order Placed",
      completed: activeStep >= 0 ? true : false,
      highlighted: activeStep === 0 ? true : false,
      selected: activeStep === 0 ? true : false,
    },
    {
      description: "Processing",
      completed: activeStep >= 1 ? true : false,
      highlighted: activeStep === 1 ? true : false,
      selected: activeStep === 1 ? true : false,
    },
    {
      description: "In Transit",
      completed: activeStep >= 2 ? true : false,
      highlighted: activeStep === 2 ? true : false,
      selected: activeStep === 2 ? true : false,
    },
    {
      description: "Shipped",
      completed: activeStep >= 3 ? true : false,
      highlighted: activeStep === 3 ? true : false,
      selected: activeStep === 3 ? true : false,
    },
    {
      description: "Delivered",
      completed: activeStep >= 4 ? true : false,
      highlighted: activeStep === 4 ? true : false,
      selected: activeStep === 4 ? true : false,
    },
  ];
  // console.log(id);

  const handleTrackDataChange = (e) =>{
    setTrackData({...trackData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(trackData);

    try {
        const response = await axios.post(`${baseUrl}/api/fetchsingleorder`, {data: trackData});
        // console.log(response.data);
        setOrder(response.data.order);
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.error);
    }
  }

  const orderDate = (createdAt) => {
    let date = new Date(createdAt);
    date.setDate(date.getDate() + 5);
    return date;
    // return new Date(createdAt);
  }; 

  return (
    <>
      <div className="mainDiv min-h-[80vh]">
        <div className="trackerOrder px-4 py-4 my-10 bg-slate-100 mx-[100px] h-auto shadow-md border border-gray-300">
          <div className="inner px-8 py-4 bg-white">
            <h1 className="font-robotoslab text-2xl font-bold capitalize my-4">
              Enter the detials to track your order:-
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form w-full grid grid-cols-12 gap-6">
                <div className="formGroup border-2 col-span-6 px-4 py-4 flex flex-col rounded-sm">
                  <label htmlFor="email" className="font-robotoslab text-lg">
                    Enter your email:-
                  </label>
                  <input
                    className="border my-2 border-gray-300 py-2 px-4 rounded-sm font-firasans outline-gray-500"
                    type="email"
                    placeholder="abc@gmail.com"
                    name="email"
                    id="email"
                    required={true}
                    value={trackData.email}
                    onChange={handleTrackDataChange}
                  />
                </div>
                <div className="formGroup border-2 col-span-6 px-4 py-4 flex flex-col rounded-sm">
                  <label
                    htmlFor="trackingId"
                    className="font-robotoslab text-lg"
                  >
                    Enter your tracking id:-
                  </label>
                  <input
                    className="border my-2 border-gray-300 py-2 px-4 rounded-sm font-firasans outline-gray-500"
                    type="text"
                    placeholder="Enter your tracking id"
                    name="trackingId"
                    id="trackingId"
                    required={true}
                    value={trackData.trackingId}
                    onChange={handleTrackDataChange}
                  />
                </div>
              </div>
              <div className="button w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className="py-2 px-8 bg-pink-500 rounded-sm text-white text-lg font-ubuntu hover:bg-pink-700"
                >
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {order.length !== 0 && <div className="my-10 bg-white mx-[100px] h-auto shadow-md border border-t-gray-300">
          <div className="header px-8 flex items-center py-2">
            <h1 className="font-bold font-robotoslab text-2xl">
              Your Order Tracking Status
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
                <div>{orderDate(order.createdAt).toDateString()}</div>
              </div>
              <div className="font-ubuntu text-lg">
                <div>Payment Status: </div>
                <div className="bg-yellow-500 text-white rounded-sm text-center shadow-sm">{order.status}</div>
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
                <div>{order.trackingId}</div>
              </div>
            </div>

            <div className="px-10 py-10 my-12 border flex justify-center items-center">
              <div className="relative flex justify-between py-2 w-full items-center">
                {newSteps.map((step, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        index !== steps.length - 1
                          ? "w-full flex items-center"
                          : "flex items-center"
                      } z-20`}
                    >
                      <div className="relative flex flex-col items-center justify-between text-teal-600">
                        <div
                          className={`border-2 border-gray-300 rounded-full w-12 h-12 flex items-center justify-center py-3 font-bold   ${
                            step.completed === true
                              ? "border-gray-300 bg-green-600 text-white"
                              : "bg-gray-100"
                          } ${
                            step.completed && step.selected
                              ? "border-4 border-yellow-500 bg-yellow-300 text-white scale-125"
                              : ""
                          }`}
                        >
                          {/* Display number */}
                          {step.completed ? (
                            <span>&#10003;</span>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div
                          className={`absolute flex justify-center items-center flex-wrap top-0 text-center mt-16 w-32 uppercase ${
                            step.completed
                              ? "font-firasans text-black text-base"
                              : "text-xs font-medium"
                          }`}
                        >
                          {/* Display description */}
                          {step.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex-auto border-t-2 absolute border-gray-300 w-full z-0">
                  {/* Display line */}
                </div>
                <div
                  className={`flex-auto border-t-2 absolute border-green-600 z-0 ${
                    order.deliveryStatus === "Order Placed" && "w-[0%]"
                  } ${order.deliveryStatus === "Processing" && "w-[25%]"} ${
                    order.deliveryStatus === "In Transit" && "w-[50%]"
                  } ${order.deliveryStatus === "Shipped" && "w-[75%]"} ${
                    order.deliveryStatus === "Delivered" && "w-[100%]"
                  }`}
                >
                  {/* Display line */}
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default TrackYourOrder;
