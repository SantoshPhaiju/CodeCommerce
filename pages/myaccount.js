import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSideBar from "../components/AccountSideBar";
import baseUrl from "../helpers/baseUrl";

const MyAccount = ({ userData }) => {
  const router = useRouter();
  // console.log(userData);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  const [userAddress, setUserAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});

  const fetchAddress = async () => {
    const response = await axios.get(
      `${baseUrl}/api/fetchaddress`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    // console.log("app", response.data);
    if (response.data.success === true) {
      setUserAddress(response.data.useraddress);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAddress();
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    Object.keys(userAddress).forEach((key) => {
      if (userAddress[key].shippingAddress === true) {
        setShippingAddress(userAddress[key]);
      }
      if (userAddress[key].billingAddress === true) {
        setBillingAddress(userAddress[key]);
      }
    });
  }, [fetchAddress]);

  return (
    <div className="w-[100vw] bg-slate-100 min-h-[90vh]">
      <div className="container mx-auto 2xl:w-[80vw] lg:w-[80vw] w-[95vw]">
        <div className="innerDiv flex flex-row py-6">
          <AccountSideBar />
          <div className="main w-[75%]">
            <h1 className="font-sans text-lg lg:text-2xl text-pink-900">
              Manage My Account
              <div className="boxes flex w-[100%] space-x-5 mt-8">
                <div className="left bg-white w-[30%] h-[250px] px-5 py-4 shadow-md">
                  <h3 className="text-lg font-normal font-robotoslab mb-4">
                    Personal Profile{" "}
                    <Link
                      href={"/myprofile"}
                      className="text-sm text-blue-500/70"
                    >
                      | EDIT
                    </Link>
                  </h3>
                  <h3 className="text-base mt-1  font-firasans">
                    {userData?.name}
                  </h3>
                  <h3 className="text-base mt-1  font-firasans">
                    {userData?.email}
                  </h3>
                  <h3 className="text-base mt-1  font-firasans">
                    {userData?.dob}
                  </h3>
                  <h3 className="text-base mt-1  font-firasans">
                    {userData?.gender}
                  </h3>
                </div>
                <div className="right bg-white w-[70%] h-[250px] px-5 py-4 shadow-md">
                  <div className="flex space-x-6 h-full">
                    <div className="rightside w-[50%]">
                      <h3 className="text-lg font-normal font-robotoslab mb-4">
                        Address Book&nbsp;
                        <Link
                          href={"/addressbook"}
                          className="text-sm text-blue-500/70"
                        >
                          | EDIT
                        </Link>
                      </h3>
                      <p className="text-sm font-medium text-gray-400 font-firasans my-3">
                        DEFAULT SHIPPING ADDRESS
                      </p>
                      {Object.keys(shippingAddress).length !== 0 ? (
                        <>
                          <h4 className="text-lg font-semibold font-roboto mb-2">
                            {shippingAddress?.name}
                          </h4>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            {shippingAddress?.address}
                          </p>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            {shippingAddress?.province} -{" "}
                            {shippingAddress?.city} - {shippingAddress?.area} -
                            {shippingAddress?.address}
                          </p>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            (+977) {shippingAddress?.mobile}
                          </p>
                        </>
                      ) : (
                        <Link
                          href={"/addressbook"}
                          className={"text-blue-500 hover:underline"}
                        >
                          Add a default address
                        </Link>
                      )}
                    </div>
                    <div className="h-full py-4 bg-gray-300 rounded-lg w-0.5"></div>
                    <div className="leftside w-[50%] mt-7">
                      <p className="text-sm font-medium text-gray-400 font-firasans my-3">
                        DEFAULT BILLING ADDRESS
                      </p>
                      {Object.keys(billingAddress).length !== 0 ? (
                        <>
                          <h4 className="text-lg font-semibold font-roboto mb-2">
                            {billingAddress?.name}
                          </h4>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            {billingAddress?.address}
                          </p>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            {billingAddress?.province} - {billingAddress?.city}{" "}
                            - {billingAddress?.area} - {billingAddress?.address}
                          </p>
                          <p className="text-sm font-medium font-firasans mb-1.5">
                            (+977) {billingAddress?.mobile}
                          </p>{" "}
                        </>
                      ) : (
                        <Link
                          href={"/addressbook"}
                          className={"text-blue-500 hover:underline"}
                        >
                          Add a default address
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
