import KhaltiCheckout from "khalti-checkout-web";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
// import { BsFillBagCheckFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import mongoose from "mongoose";
import Order from "../models/Order";

const Checkout = ({
  cart,
  subTotal,
  addToCart,
  removeFromCart,
  clearCart,
  order,
}) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [userAddress, setUserAddress] = useState({});

  // console.log(order);

  const { oid, id } = router.query;

  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: Object.keys(order).length !== 0 ? order.phone : "",
    address: Object.keys(order).length !== 0 ? order.address : "",
    city: Object.keys(order).length !== 0 ? order.city : "",
    state: Object.keys(order).length !== 0 ? order.state : "",
  });
  const [pincode, setPincode] = useState(
    Object.keys(order).length !== 0 ? order.pincode : ""
  );
  const [disabled, setDisabled] = useState(true);

  const fetchAddress = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchaddress`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    // console.log("app", response.data);
    if (response.data.success === true) {
      setUserAddress(response.data.useraddress);
      console.log("ordeData", orderData);
      response.data.useraddress.map((address) => {
        if (address.shippingAddress === true && oid === undefined) {
          // do the state change like this if you have to set previous data not then you know the consequences bro
          setOrderData((orderData) => ({
            ...orderData,
            address: address.address,
            phone: address.mobile,
          }));
        }
      });
    }
  };

  const fetchuser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchuserdata`,
      { data: token }
    );
    setUser(response.data.user);
    if (response.data) {
      // console.log("response: " , response.data.user)
      setOrderData({
        ...orderData,
        name: response.data.user.name,
        email: response.data.user.email,
      });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchuser();
      fetchAddress();
    }

    if (Object.keys(order).length !== 0) {
      setDisabled(false);
    }
  }, []);

  const orderId = oid || Math.floor(Math.random() * Date.now()); // Order id needs to be changed

  let config = {
    // replace this key with yours
    publicKey: process.env.NEXT_PUBLIC_KHALTI_TEST_PUBLIC_KEY,
    productIdentity: orderId,
    productName: "CODE COMMERCE",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        // console.log(payload);

        axios
          .post(`${process.env.NEXT_PUBLIC_HOST}/api/paymentverification`, {
            data: payload,
          })
          .then((response) => {
            // console.log(response.data);
            alert("Transaction successfull!");
            localStorage.removeItem("cart");
            clearCart();
            router.push("/order?id=" + response.data.id);
          })
          .catch((error) => {
            alert("Transaction failed on server");
            console.log(error);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        alert("Transaction failed");
        // console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout;
  if (typeof window !== "undefined") {
    checkout = new KhaltiCheckout(config);
    // console.log(checkout);
  }

  const handleChange = async (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
    if (e.target.name === "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length === 5) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        // console.log(pinJson);
        if (Object.keys(pinJson).includes(e.target.value)) {
          setOrderData({
            ...orderData,
            city: pinJson[e.target.value][0],
            state: pinJson[e.target.value][1],
          });
        } else {
          setOrderData({ ...orderData, city: "", state: "" });
          toast.warning("Pincode is not serviceable yet!");
        }
      } else {
        setOrderData({ ...orderData, city: "", state: "" });
      }
    }
    setTimeout(() => {
      if (Object.keys(orderData).length === 0) {
        if (
          orderData.name.length > 3 &&
          orderData.address.length > 3 &&
          pincode.length > 3 &&
          orderData.phone.length > 9
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } else {
        setDisabled(false);
      }
    }, 200);
  };

  const payTotal = subTotal + "00";

  // Order should only be placed after the payment
  // TODO: Needs to populate orders in the database only after the payment is made
  console.log(orderData);
  const orderDetails = { ...orderData, orderId, subTotal, cart, id, pincode };
  return (
    <div className="container mx-auto max-w-[1200px] px-3 mb-20">
      <h1 className="font-bold text-3xl my-8 text-pink-800 text-center font-roboto">
        Checkout
      </h1>
      <h2 className="font-medium font-firasans text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={orderData.name}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={orderData.email}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-2">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            cols="20"
            rows="2"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={orderData.address}
            onChange={handleChange}
            required
          ></textarea>
          <p className="opacity-70 text-sm mt-0 mb-2 text-gray-700 italic">
            Eg: Ganeshthan, Chabahil
          </p>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={orderData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              PinCode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={orderData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={orderData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <h2 className="font-medium font-firasans text-xl mt-8">
        2. Review Cart Items & Pay
      </h2>
      <div className="sidebar bg-pink-100 px-10 py-4 rounded-md font-medium">
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="text-center my-5 font-light font-firasans">
              Your cart is Empty ! 😵‍💫
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex flex-wrap my-3 text-base 2xl:text-lg font-firasans font-medium text-black">
                  <div className="w-[60%] sm:w-[60%] md:w-[40%]">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex justify-center items-center w-[20%]">
                    <img
                      src={cart[k].img}
                      className="object-top object-contain w-full h-[12vh] block mx-auto mr-2 mt-2"
                      alt="This is the product image."
                    />
                  </div>
                  <div className="w-1/3 flex items-center justify-center gap-3 text-lg">
                    <AiFillMinusCircle
                      onClick={() =>
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant,
                          cart[k].img
                        )
                      }
                      className="text-xl text-pink-600 cursor-pointer"
                    />
                    <span>{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() =>
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant,
                          cart[k].img
                        )
                      }
                      className="text-xl text-pink-600 cursor-pointer"
                    />
                  </div>
                </div>
                <hr className="text-black opacity-100 mb-4 border-top-2 border-gray-400 text-lg w-full font-bold " />
              </li>
            );
          })}
        </ol>
        {Object.keys(cart).length !== 0 && (
          <span className="subtotal font-bold font-robotoslab pt-4">
            SubTotal: रु {subTotal}
          </span>
        )}
      </div>
      <div className="ml-3 flex space-x-4">
        <button
          disabled={disabled}
          onClick={async () => {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
              {
                data: orderDetails,
              }
            );
            // console.log(response.data);
            if (response.data.success === false) {
              // console.log(response.data);
              toast.error(response.data.error);
              clearCart();
              setDisabled(true);
            } else if (response.data.success === "check") {
              toast.error(response.data.error);
            } else {
              return checkout.show({ amount: Number(payTotal) });
            }
          }}
          className="transition-all duration-300 disabled:bg-pink-200 disabled:shadow-none disabled:text-black font-firasans bg-pink-400 py-1 my-2 text-lg px-10 md:px-5 font-medium text-center rounded-md hover:bg-pink-500 flex items-center justify-center space-x-2 shadow-lg shadow-gray-700/50 text-purple-700"
        >
          {/* <BsFillBagCheckFill className="text-base" /> */}
          <img
            src="/khalti.png"
            alt="khalti logo here"
            className="w-14 h-8 -mx-4"
          />
          <span>Pay Rs.{Object.keys(cart).length !== 0 ? subTotal : 0}</span>
        </button>
        {!oid && (
          <button
            disabled={disabled}
            onClick={async () => {
              // console.log(orderDetails);
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
                {
                  data: orderDetails,
                }
              );
              // console.log(response.data);
              if (response.data.success === false) {
                // console.log(response.data);
                toast.error(response.data.error);
                clearCart();
                setDisabled(true);
              } else if (response.data.success === "check") {
                toast.error(response.data.error);
              } else {
                toast.success("Your order has been successfully placed!");
                clearCart();
                setDisabled(true);
                router.push("/orders");
              }
            }}
            className="transition-all duration-300 disabled:bg-pink-200 disabled:shadow-none disabled:text-black font-firasans bg-pink-400 py-1 my-2 text-lg px-10 md:px-5 font-medium text-center rounded-md hover:bg-pink-500 flex items-center justify-center space-x-2 shadow-lg shadow-gray-700/50 text-purple-700"
          >
            <span>Place Order</span>
          </button>
        )}
      </div>
    </div>
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

export default Checkout;
