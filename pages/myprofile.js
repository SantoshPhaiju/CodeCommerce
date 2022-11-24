import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AccountSideBar from "../components/AccountSideBar";

const MyAccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const months = ['Janauary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Deceomber'];
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  const years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  return (
    <div className="w-[100vw] bg-slate-100 min-h-[90vh]">
      <div className="container mx-auto 2xl:w-[80vw] lg:w-[80vw] w-[95vw]">
        <div className="innerDiv flex flex-row py-6">
          <AccountSideBar />
          <div className="main w-[75%]">
            <h1 className="font-sans text-lg lg:text-2xl text-pink-900">
              My Profile
            </h1>
            <div className="bg-white w-full h-auto min-h-[50vh] px-10 py-6 shadow-md my-8">
              <div className="form grid grid-cols-3 gap-4">
                <div className="inputGroup col-span-1 flex flex-col my-4">
                  <label htmlFor="fullName" className="text-sm px-2 mb-3">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    className="outline-gray-500 font-firasans border-gray-300 py-1 px-2"
                    type="text"
                    value={""}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="inputGroup col-span-1 flex flex-col my-4">
                  <label htmlFor="email" className="text-sm px-2 mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="outline-gray-500 font-firasans border-gray-300 py-1 px-2"
                    type="email"
                    value={""}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="inputGroup col-span-1 flex flex-col my-4">
                  <label htmlFor="fullName" className="text-sm px-2 mb-3">
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    className="outline-gray-500 font-firasans border-gray-300 py-1 px-2"
                    type="number"
                    value={""}
                    placeholder="Add your mobile number"
                  />
                </div>
              </div>
              <div className="form grid grid-cols-3 gap-4">
                <div className="inputGroup col-span-1 flex flex-col my-4">
                  <label htmlFor="email" className="text-sm px-2 mb-3">
                    Enter Birthday
                  </label>
                  <div className="select flex">

                  <select name="month" id="month" className="w-[30%]">
                    <option value="month" selected>Month</option>
                    {months.map((month, index) =>{
                        // console.log(month)
                        return <option key={index} value={month}>{month}</option>
                    })}
                  </select>
                  <select name="day" id="day" className="w-[20%]">
                    <option value="day" selected>Day</option>
                    {days.map((day, index) =>{
                        // console.log(month)
                        return <option key={index} value={day}>{day}</option>
                    })}
                  </select>
                  <select name="year" id="year" className="w-[50%]">
                    <option value="year" selected>Year</option>
                    {years.map((year, index) =>{
                        // console.log(month)
                        return <option key={index} value={year}>{year}</option>
                    })}
                  </select>
                        </div>
                </div>
                <div className="inputGroup col-span-1 flex flex-col my-4">
                  <label htmlFor="gender" className="text-sm px-2 mb-3">
                    Gender
                  </label>
                  <select name="gender" id="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            <button className="mt-10 py-4 px-8 font-firasans text-xl bg-red-500 rounded-md text-white">
                Make changes
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
