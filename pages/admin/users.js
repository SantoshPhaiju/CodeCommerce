import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import AdminNav from "./components/AdminNav";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "./components/Sidebar";

const Users = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const getFirstLetter = (str) => {
    return str.slice(0, 1).toUpperCase();
  };

  const handleEdit = (id) => {
    console.log(id);
    setShowModal(true);
  };

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

              <div
                className={`modalContainer flex justify-center items-center relative mx-auto z-50 transition-all duration-300 ${
                  showModal === true ? "opacity-100" : "opacity-0 -translate-y-20"
                }`}
              >
                <div className="modal absolute -top-10 left-auto right-auto h-auto w-[500px] shadow-lg shadow-gray-700 z-50 bg-slate-50 rounded-md">
                  <div className="modalHeader py-3 px-4">
                    <h2 className="font-robotoslab text-center text-2xl">
                      Edit User
                    </h2>
                    <div className="close">
                      <AiOutlineClose
                        className="text-3xl absolute right-3 top-4 cursor-pointer transition-all duration-300 hover:transform hover:rotate-180"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="modalBody">
                    <form>
                      <div className="inputGroup mx-4 my-2">
                        <label className="font-firasans text-base" htmlFor="name">Name: </label>
                        <input className="w-full border-2 rounded-md my-1 border-pink-500 outline-blue-600 py-2 px-4" type="text" name="name" id="name" required />
                      </div>
                      <div className="inputGroup mx-4 my-2">
                        <label className="font-firasans text-base" htmlFor="name">User Type: </label>
                        <select className="w-full border-2 rounded-md my-1 border-pink-500 outline-blue-600 py-2 px-4" type="text" name="name" id="name" required>
                          <option value="false">Normal User</option>
                          <option value="true">Admin</option>
                        </select>
                      </div>
                      <div className="inputGroup mx-4 my-2">
                        <label className="font-firasans text-base" htmlFor="name">Name: </label>
                        <input className="w-full border-2 rounded-md my-1 border-pink-500 outline-blue-600 py-2 px-4" type="text" name="name" id="name" required />
                      </div>
                    </form>
                  </div>
                  <hr />
                  <div className="modalFooter flex justify-end mr-4 space-x-5 my-4">
                    <button className="py-2 px-6 text-lg bg-blue-300 rounded-md text-black font-ubuntu hover:shadow-lg hover:shadow-gray-300" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="py-2 px-6 text-lg bg-green-700 rounded-md text-white font-ubuntu hover:shadow-lg hover:shadow-gray-300">Update</button>
                  </div>
                </div>
              </div>
              {showModal && (
                <>
                  <div className="overlay h-full w-full absolute top-0 left-0 z-30 opacity-40 bg-black"></div>
                </>
              )}

              <div className="overflow-x-auto shadow-md shadow-gray-500/30 sm:rounded-lg mb-10">
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
                        User Type
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
                    {users.length !== 0 &&
                      users.map((item, index) => {
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
                              ) : (
                                // <div className="h-10 rounded-full text-lg flex items-center justify-center bg-pink-600 text-white w-10 border">
                                //   {getFirstLetter(item.name)}
                                // </div>
                                <div
                                  className={`h-10 rounded-full text-lg flex items-center justify-center bg-pink-600 text-white w-10 border`}
                                >
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
                              {item?.gender !== ""
                                ? item.gender
                                : "not provided"}
                            </td>
                            <td className="py-4 px-6">
                              {item?.phone !== null ? (
                                item.phone
                              ) : (
                                <p className="text-start">---------</p>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                                onClick={() => handleEdit(item._id)}
                              >
                                <FaUserEdit className="text-2xl text-orange-500 hover:scale-110" />
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

export default Users;
