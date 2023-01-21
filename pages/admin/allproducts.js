import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../slices/productSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AiOutlineEye } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";

const AllProducts = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  // const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const sideBarRef = useRef();
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const handleDelete = (id) => {
    if (confirm("Do you want to delete this product?")) {
      dispatch(deleteProduct({ id, toast }));
    }
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
          <div className="heading flex flex-col sm:flex-row sm:justify-between mx-8 mr-20 sm:items-center">
            <h1 className="font-roboto text-2xl my-4 mx-4 text-blue-800">
              All Products
            </h1>
            <span className="text-lg font-robotoslab mt-0 sm:mt-4 ml-4 sm:ml-0">
              Total Products: {products?.length}
            </span>
          </div>
          {/* <div className="productContainer flex flex-wrap gap-6 my-10 justify-center mx-12">
            {products.length !== 0 &&
              products.map((product, index) => {
                return (
                  <div className="product w-[300px] mt-4 border" key={index}>
                    <img
                      src={product?.img[0]}
                      key={index}
                      width={400}
                      className="w-full h-[35vh] block mx-auto"
                      height={500}
                      alt="This is the image here"
                    />
                    <hr />
                    <div className="ml-4 font-firasans mt-2">
                      {product.category}
                    </div>
                    <div className="content flex justify-start capitalize items-center h-[50px]">
                      <h2 className="text-xl font-firasans px-4 py-1">
                        Variant:
                        {product.title} ({product.color}/{product.size})
                      </h2>
                    </div>
                    <h2 className="text-xl font-firasans px-4 py-1 text-left">
                      AvailableQty: {product.availableQty}
                    </h2>
                    <div className="buttons flex space-x-5 my-3 justify-center">
                      <button className="bg-pink-700 text-white py-2 px-8 rounded-sm shadow-lg cursor-pointer font-firasans hover:bg-pink-900 flex justify-center items-center space-x-2">
                        <BiEditAlt />
                        <span>Edit</span>
                      </button>
                      <button
                        className="bg-orange-500 text-white py-2 px-8 rounded-sm shadow-lg cursor-pointer font-firasans hover:bg-orange-700 flex justify-center items-center space-x-2"
                        onClick={() => handleDelete(product._id)}
                      >
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div> */}

          

          
        </div>
      </div>
    </>
  );
};

export default AllProducts;
