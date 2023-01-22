import React from "react";
import { useState } from "react";
import MainConfig from "./components/MainConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";

const CategoryPage = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      <MainConfig showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
      <div
        className={`main pl-0 transition-all duration-300 mt-24 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="categories mx-10">
          <h1 className="text-3xl text-gray-700 font-firasans my-4">
            All Categories
          </h1>

          <div className="categoryTable overflow-x-auto  mb-3">
            {categories.length !== 0 ? <table className="table">
              <thead className="table_head">
                <tr>
                  <th scope="col" className="table_heading">
                    S.N.
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
                {categories.length !== 0 && categories
                  .map((item, index) => {
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
                        <td className="table_data">{item?.title}</td>
                        <td className="table_data">Rs.{item?.price}</td>
                        <td className="table_data">
                          <img
                            onClick={() => showAllImages(index)}
                            className="w-auto h-[100px] mx-auto"
                            src={item?.img[0]}
                            alt="This is the product image here"
                          />
                        </td>
                        <td className="table_data">
                          {item.availableQty !== 0 ? (
                            item.availableQty
                          ) : (
                            <span className="py-1 px-4 bg-red-600 text-white">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="table_data">{item?.category}</td>
                        <td className="table_data">
                          <div className="flex space-x-3">
                            <Link
                              href={"/admin/product?id=" + item?._id}
                              className="view_btn"
                            >
                              <AiOutlineEye className="text-lg" />
                              <span>View</span>
                            </Link>
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
            </table> : <div className="text-xl text-center font-ubuntu text-red-700">No Categories to show</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
