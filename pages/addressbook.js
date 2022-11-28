import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSideBar from "../components/AccountSideBar";
import { AiOutlinePlus } from "react-icons/ai";

const AddressBook = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const [editProfile, setEditProfile] = useState(false);
  // console.log(userData);
  const [userAddress, setUserAddress] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

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
      // console.log(userAddress);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // const handleChange = (e) => {
  //   if (e.target.name === "year") {
  //     setYear(e.target.value);
  //   }
  //   if (e.target.name === "month") {
  //     setMonth(e.target.value);
  //   }
  //   if (e.target.name === "day") {
  //     setDay(e.target.value);
  //   }
  //   if (e.target.name === "dob") {
  //     setDob(e.target.value);
  //   }
  //   console.log(e.target.name, e.target.value);

  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   console.log(updateData);
  //   setEditProfile(false);
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
  //     { data: updateData }
  //   );
  //   if (response) {
  //     console.log(response.data);
  //   }
  // };

  return (
    <div className="w-[100vw] bg-slate-100 min-h-[90vh] ">
      <div className="container mx-auto 2xl:w-[80vw] lg:w-[80vw] w-[95vw]">
        <div className="innerDiv flex flex-row py-6">
          <AccountSideBar />
          <div className="main w-[75%]">
            <div className="header flex justify-between">
              <h1 className="font-sans text-lg lg:text-2xl text-pink-900">
                Address Book
              </h1>
              <h1
                className="font-firasans text-base lg:text-lg text-pink-900 flex space-x-2 justify-center items-center cursor-pointer hover:text-blue-500"
                onClick={() => setOpenModal(true)}
              >
                <AiOutlinePlus />
                <span>Add New Address</span>
              </h1>
            </div>
            <div className="bg-white w-full h-auto min-h-[50vh] px-10 py-6 shadow-md my-4">
              <div className="addressContainer grid grid-cols-2 gap-6">
                {userAddress.length !== 0 &&
                  userAddress.map((address, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="address border border-gray-400 rounded-sm h-[180px] transition-all duration-500 hover:shadow-md hover:shadow-gray-700/50 cursor-pointer px-4
                         py-5"
                        >
                          <div className="grid grid-cols-12">
                            <div className="left col-span-10">
                              <p className="text-sm text-black font-robotoslab mb-2">
                                {address?.name}
                              </p>
                              <p className="text-sm text-black font-robotoslab mb-2">
                                (+977) {address?.mobile}
                              </p>
                              <p className="text-sm text-black font-robotoslab mb-2">
                                {address?.province}, {address?.city},{" "}
                                {address?.area}, {address?.address},{" "}
                                {address?.landmark}
                              </p>
                              <div className="labels flex flex-wrap gap-3">
                                <span className=" text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                  Home
                                </span>
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                  Defalut shipping address
                                </span>
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                  Default billing address
                                </span>
                              </div>
                            </div>
                            <div className="right col-span-2">
                              <p className="text-blue-500 font-sans cursor-pointer text-sm text-right">
                                EDIT
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {userAddress.length === 0 && (
                <div
                  className="text-center my-auto mx-auto font-firasans text-3xl flex items-center justify-center gap-2 hover:text-blue-700 cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  {" "}
                  <AiOutlinePlus /> Add New Address{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <>
          <div className="overlay absolute top-0 left-0 h-[100vh] w-full bg-black opacity-30"></div>
          <div className="flex justify-center items-center">
            <div className="modal min-h-[200px] overflow-y-auto fixed top-[80px] bg-white h-auto w-[800px] rounded-md z-50 shadow-lg shadow-slate-900/50">
              <div className="modalHeader px-8 py-6 font-firasans flex justify-between">
                <span>Add New Delivery Address</span>
                <button
                  className="px-4 text-xl"
                  onClick={() => setOpenModal(false)}
                >
                  ❌
                </button>
              </div>
              <hr />
              <div className="modalBody bg-[#fafafa] h-auto w-full mb-2 px-8 py-4">
                <form>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="left col-span-1">
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Full Name</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="Input full name"
                          type="text"
                          name="name"
                          id="name"
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="Input mobile number"
                          type="number"
                          name="mobile"
                          id="mobile"
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Province</label>
                        <select
                          name="province"
                          id="province"
                          className="cursor-pointer px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          defaultValue={"Please choose your province"}
                        >
                          <option value="" disabled>Please choose your province</option>
                          <option value="Bagmati">Bagmati</option>
                        </select>
                      </div>
                    </div>
                    <div className="right col-span-1">
                      <div className="inputGroup mb-2">
                        <label htmlFor="address">Address</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="House no. / building / street / area"
                          type="text"
                          name="address"
                          id="address"
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Full Name</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="Input full name"
                          type="text"
                          name="name"
                          id="name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default AddressBook;
