import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSideBar from "../components/AccountSideBar";
import {AiOutlinePlus} from 'react-icons/ai'

const AddressBook = () => {
  const router = useRouter();

  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({});
  // console.log(userData);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const [dob, setDob] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

//   const fetchAddress = async () => {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_HOST}/api/fetchaddress`,
//       { data: token }
//     );
//     console.log("app", response.data);
//     if (response.data) {
//       setUserData(response.data.user);
//     }
//   };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchuser();
    }
    if (editProfile === true) {
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone ? userData.phone : "",
        gender: userData.gender,
      });
      setDob(userData.dob);
    }
  }, [editProfile, formData]);

  const handleChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    }
    if (e.target.name === "month") {
      setMonth(e.target.value);
    }
    if (e.target.name === "day") {
      setDay(e.target.value);
    }
    if (e.target.name === "dob") {
      setDob(e.target.value);
    }
    console.log(e.target.name, e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updateData = { ...formData, dob, id: userData._id };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(updateData);
    setEditProfile(false);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
      { data: updateData }
    );
    if (response) {
      console.log(response.data);
    }
  };

  return (
    <div className="w-[100vw] bg-slate-100 min-h-[90vh]">
      <div className="container mx-auto 2xl:w-[80vw] lg:w-[80vw] w-[95vw]">
        <div className="innerDiv flex flex-row py-6">
          <AccountSideBar />
          <div className="main w-[75%]">
            <div className="header flex justify-between">
              <h1 className="font-sans text-lg lg:text-2xl text-pink-900">
                Address Book
              </h1>
              <h1 className="font-firasans text-base lg:text-lg text-pink-900 flex space-x-2 justify-center items-center cursor-pointer hover:text-blue-500">
                <AiOutlinePlus />
                <span>Add New Address</span>
              </h1>
            </div>
            <div className="bg-white w-full h-auto min-h-[50vh] px-10 py-6 shadow-md my-4">
              <div className="addressContainer grid grid-cols-2 gap-6">
                <div className="address border border-gray-400 rounded-sm h-[180px] transition-all duration-500 hover:shadow-md hover:shadow-gray-700/50 cursor-pointer px-4
                 py-5">
                    <div className="grid grid-cols-12">
                        <div className="left col-span-10">
                            <p className="text-sm text-black font-robotoslab mb-2">Santosh Phaiju</p>
                            <p className="text-sm text-black font-robotoslab mb-2">(+977) 9803045389</p>
                            <p className="text-sm text-black font-robotoslab mb-2">Province, City, Area, Address, landmark</p>
                            <div className="labels flex flex-wrap gap-3">
                                <span className=" text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">Home</span>
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">Defalut shipping address</span>
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">Default billing address</span>
                            </div>
                        </div>
                        <div className="right col-span-2">
                            <p className="text-blue-500 font-sans cursor-pointer text-sm text-right">EDIT</p>
                        </div>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddressBook;
