import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";

const users = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  //  console.log(users);

  const getFirstLetter = (str) =>{
    return str.slice(0, 1).toUpperCase();
  }

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
          <div className="usersTable py-10">
            <div className="container w-[96%] sm:w-[90%] mx-auto">
              <h1 className="font-roboto text-2xl text-center my-6 text-pink-700">
                All Users
              </h1>

              <div className="overflow-x-auto relative shadow-md shadow-gray-500/30 sm:rounded-lg mb-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-base font-firasans text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-4 px-6">
                        S.N.
                      </th>
                      <th scope="col" className="py-4 px-6">
                        User Id
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Avatar
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Email
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Name
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Admin
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Gender
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Phone
                      </th>
                      <th scope="col" className="py-4 px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr
                          key={item?._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-firasans"
                        >
                          <td className="py-4 px-6">{index + 1}</td>

                          <td className="py-4 px-6">{item._id}</td>
                          <td className="py-4 px-6 flex justify-center items-center">
                            {item.gender !== "" ? (
                              <img
                                src={`/${item.gender}.png`}
                                className="border rounded-full h-10"
                                alt="Male Image"
                              />
                              // <div className="h-10 rounded-full text-lg flex items-center justify-center bg-pink-600 text-white w-10 border">
                              //   {getFirstLetter(item.name)}
                              // </div>
                            ) : (
                              <div className={`h-10 rounded-full text-lg flex items-center justify-center bg-pink-600 text-white w-10 border`}>
                                {getFirstLetter(item.name)}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">{item?.email}</td>
                          <td className="py-4 px-6">{item?.name}</td>
                          <td className="py-4 px-6">
                            {item?.admin === true ? "Admin" : "Normal User"}
                          </td>
                          <td className="py-4 px-6">
                            {item?.gender !== "" ? item.gender : "not provided"}
                          </td>
                          <td className="py-4 px-6">
                            {item?.phone !== null ? (
                              item.phone
                            ) : (
                              <p className="text-start">---------</p>
                            )}
                          </td>
                          <td className="py-4 px-6 flex space-x-3">
                            <Link
                              href={"/order?id=" + item?._id}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteOrder(item?._id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default users;
