import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AccountSideBar from "../components/AccountSideBar";

const MyAccount = ({userData}) => {
  const router = useRouter();
  console.log(userData);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
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
                    <Link href={"/myprofile"} className="text-sm text-blue-500/70">
                      | EDIT
                    </Link>
                  </h3>
                  <h3 className="text-base mt-1  font-firasans">{userData?.name}</h3>
                  <h3 className="text-base mt-1  font-firasans">{userData?.email}</h3>
                  <h3 className="text-base mt-1  font-firasans">{userData?.dob}</h3>
                  <h3 className="text-base mt-1  font-firasans">{userData?.gender}</h3>
                </div>
                <div className="right bg-white w-[70%] h-[250px] px-5 py-4 shadow-md">
                  <div className="flex space-x-6 h-full">
                    <div className="rightside w-[50%]">
                      <h3 className="text-lg font-normal font-robotoslab mb-4">
                        Address Book&nbsp;
                        <Link href={"/"} className="text-sm text-blue-500/70">
                          | EDIT
                        </Link>
                      </h3>
                      <p className="text-sm font-medium text-gray-400 font-firasans my-3">
                        DEFAULT SHIPPING ADDRESS
                      </p>
                      <h4 className="text-lg font-semibold font-roboto mb-2">
                        Santosh Phaiju
                      </h4>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        Chabahil
                      </p>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        Bagmati Province - Kathmandu Metro 7 - Chabahil Area -
                        Chabahil Chowk
                      </p>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        (+977) 9803045389
                      </p>
                    </div>
                    <div className="h-full py-4 bg-gray-300 rounded-lg w-0.5"></div>
                    <div className="leftside w-[50%] mt-7">
                      <p className="text-sm font-medium text-gray-400 font-firasans my-3">
                        DEFAULT SHIPPING ADDRESS
                      </p>
                      <h4 className="text-lg font-semibold font-roboto mb-2">
                        Santosh Phaiju
                      </h4>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        Chabahil
                      </p>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        Bagmati Province - Kathmandu Metro 7 - Chabahil Area -
                        Chabahil Chowk
                      </p>
                      <p className="text-sm font-medium font-firasans mb-1.5">
                        (+977) 9803045389
                      </p>
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
