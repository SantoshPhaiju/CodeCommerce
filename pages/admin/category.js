import React from "react";
import { useState } from "react";
import MainConfig from "./components/MainConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../slices/categorySlice";
import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Link from "next/link";
import Spinner from "../../components/Spinner";

const CategoryPage = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const [categoryId, setCategoryId] = useState("");
  // console.log(status);
  const [categoryData, setCategoryData] = useState({
    cName: "",
    cDesc: "",
  });
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleOnChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setShowModal(false);
    if (categoryData.cName && categoryData.cDesc !== "") {
      dispatch(addCategory({ categoryData, toast }));
      setCategoryData({
        cName: "",
        cDesc: "",
      });
    } else {
      toast.error("Name and Description cannot be empty");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Do you really want to delete this category")) {
      dispatch(deleteCategory({ id, toast }));
    }
  };

  const handleUpdate = () => {
    setShowEditModal(false);
    dispatch(updateCategory({ id: categoryId, categoryData, toast }));
    console.log("Handle Update function runned");
    setCategoryData({
      cName: "",
      cDesc: "",
    });
  };

  return (
    <>
      {showModal ||
        (showEditModal && (
          <style jsx global>{`
            html {
              overflow: hidden;
            }
          `}</style>
        ))}
      <MainConfig showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
      <div
        className={`main pl-0 transition-all duration-300 mt-24 min-h-[100vh] ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="categories mx-10">
          <h1 className="text-3xl text-gray-700 font-firasans my-4">
            All Categories
          </h1>
          {(status === "idle" || status === "loading") && (
            <div className="flex justify-center my-5">
              <Spinner />
            </div>
          )}

          <div
            className={`modalContainer flex justify-center items-center relative mx-auto z-50 transition-all duration-300 ${
              showModal || showEditModal === true
                ? "opacity-100"
                : "opacity-0 -translate-y-[500px]"
            }`}
          >
            <div className="modal absolute -top-10 left-auto right-auto h-auto w-[500px] shadow-lg shadow-gray-700 z-50 bg-slate-50 rounded-md">
              <div className="modalHeader py-3 px-4">
                <h2 className="font-robotoslab text-center text-2xl">
                  {showModal === true && "Add New Category"}
                  {showEditModal === true && "Update Category"}
                </h2>
                <div className="close">
                  <AiOutlineClose
                    className="text-3xl absolute right-3 top-4 cursor-pointer transition-all duration-300 hover:transform hover:rotate-180"
                    onClick={() => {
                      setShowModal(false);
                      setShowEditModal(false);
                    }}
                  />
                </div>
              </div>
              <hr />
              <div className="modalBody">
                <form>
                  <div className="inputGroup mx-4 my-2">
                    <label htmlFor="cName" className="label">
                      <span> Category Name:</span>
                    </label>
                    <input
                      className="input_field"
                      type="text"
                      name="cName"
                      id="cName"
                      value={categoryData.cName}
                      onChange={handleOnChange}
                      placeholder="Ex:Tshirts"
                      required
                    />
                  </div>
                  <div className="inputGroup mx-4 my-2">
                    <label htmlFor="cDesc" className="label">
                      <span> Category Description:</span>
                    </label>
                    <textarea
                      className="input_field"
                      rows={3}
                      type="text"
                      name="cDesc"
                      id="cDesc"
                      value={categoryData.cDesc}
                      onChange={handleOnChange}
                      placeholder="Ex: Best tshirts of the site"
                      required
                    />
                  </div>
                </form>
              </div>
              <hr />
              <div className="modalFooter flex justify-end mr-4 space-x-5 my-4">
                <button
                  className="py-2 px-6 text-lg bg-blue-300 rounded-sm text-black font-ubuntu hover:shadow-lg hover:shadow-gray-300"
                  onClick={() => {
                    setShowModal(false);
                    setShowEditModal(false);
                    setCategoryData({
                      cName: "",
                      cDesc: "",
                    });
                    setCategoryId();
                  }}
                >
                  Cancel
                </button>
                {showModal && (
                  <button
                    className="py-2 px-6 text-lg bg-green-700 rounded-sm text-white font-ubuntu hover:shadow-lg hover:shadow-gray-300"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Add
                  </button>
                )}
                {showEditModal && (
                  <button
                    className="py-2 px-6 text-lg bg-green-700 rounded-sm text-white font-ubuntu hover:shadow-lg hover:shadow-gray-300"
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
          {showModal ||
            (showEditModal && (
              <>
                <div className="overlay h-full w-full absolute top-0 left-0 z-30 opacity-40 bg-black"></div>
              </>
            ))}

          <button
            className="text-xl bg-pink-700 my-4 font-ubuntu text-white py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            + Add new Category
          </button>

          <div className="categoryTable overflow-x-auto  mb-3">
            {categories.length !== 0 ? (
              <table className="table">
                <thead className="table_head">
                  <tr>
                    <th scope="col" className="table_heading">
                      S.N.
                    </th>
                    <th scope="col" className="table_heading">
                      Category Id
                    </th>
                    <th scope="col" className="table_heading">
                      Category Name
                    </th>
                    <th scope="col" className="table_heading">
                      Category Description
                    </th>
                    <th scope="col" className="table_heading">
                      Products
                    </th>
                    <th scope="col" className="table_heading">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {categories.length !== 0 &&
                    categories.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr key={index} className="table_body_tr">
                          <td className="table_data">{index + 1}</td>
                          <td
                            scope="row"
                            className="table_data font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline border-gray-700"
                          >
                            # {item?._id}
                          </td>
                          <td className="table_data">{item?.name}</td>
                          <td className="table_data">{item?.description}</td>
                          <td className="table_data">
                            {item?.products.length}
                          </td>

                          <td className="table_data">
                            <div className="flex space-x-3">
                              <button
                                className="view_btn"
                                onClick={() => {
                                  setShowEditModal(true);
                                  setCategoryId(item._id);
                                  setCategoryData({
                                    cName: item.name,
                                    cDesc: item.description,
                                  });
                                }}
                              >
                                <AiOutlineEdit className="text-lg" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(item?._id)}
                                className="delete_btn"
                              >
                                <AiOutlineDelete className="text-lg" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div
                className="text-3xl text-center font-ubuntu text-pink-700 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                + Add new Category
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
