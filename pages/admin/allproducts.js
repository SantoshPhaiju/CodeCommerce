import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AiOutlineEye } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import Link from "next/link";
import MainConfig from "./components/MainConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineClose } from "react-icons/ai";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";

const AllProducts = () => {
  const ref = useRef(null);
  console.log("All Products");

  const [showSideBar, setShowSidebar] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  // const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const router = useRouter();
  const [query, setQuery] = useState("");

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const handleDelete = (id) => {
    if (
      confirm(
        "Do you want to delete this product? Deleting this product will delete all the variants of this product!"
      )
    ) {
      dispatch(deleteProduct({ id, toast }));
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const [images, setImages] = useState([]);

  const showAllImages = (index) => {
    console.log(products[index]);
    setShowSlider(true);

    setImages(products[index].img);
  };

  return (
    <>
      {showSlider && (
        <style jsx global>{`
          html {
            overflow: hidden;
          }
        `}</style>
      )}

      <MainConfig showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
      <div
        ref={ref}
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

          <div className="flex justify-center items-center">
            {showSlider === true && (
              <div className="imageSlider overflow-y-scroll absolute top-0 left-0 h-full w-[100vw] z-50 rounded-md bg-black/50 py-10">
                <button
                  className="absolute top-10 right-8 cursor-pointer z-50"
                  onClick={() => setShowSlider(false)}
                >
                  <AiOutlineClose className="text-3xl transition-all duration-300 text-white cursor-pointer hover:rotate-180" />
                </button>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {images.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          className={"w-full h-full object-top object-contain"}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </div>
          {showSlider === true && (
            <div className="overlay overflow-y-auto absolute top-0 left-0 w-full h-full bg-black/50 z-40"></div>
          )}

          <div className="search mx-10">
            <div className="formGroup">
              <p className="text-xs flex flex-wrap w-[250px] text-red-400 font-firasans">
                Search by title or name
              </p>
              <input
                name="query"
                value={query}
                onChange={handleSearchChange}
                className="py-2 px-4 font-firasans border-2 mb-2 mr-2 rounded-sm text-lg border-gray-400 outline-gray-600"
                type="text"
                placeholder="Search......"
              />
            </div>
          </div>

          {/* Creating table to show the products details */}
          {products.length !== 0 ? (
            <div className="overflow-x-auto shadow-md shadow-gray-500/30 mb-3 mx-10">
              <table className="table">
                <thead className="table_head">
                  <tr>
                    <th scope="col" className="table_heading">
                      S.N.
                    </th>
                    <th scope="col" className="table_heading">
                      Product Id
                    </th>
                    <th scope="col" className="table_heading">
                      Title
                    </th>
                    <th scope="col" className="table_heading">
                      Price
                    </th>
                    <th scope="col" className="table_heading">
                      Variants
                    </th>
                    <th scope="col" className="table_heading">
                      Image
                    </th>
                    <th scope="col" className="table_heading">
                      Stock
                    </th>
                    <th scope="col" className="table_heading">
                      Category
                    </th>
                    <th scope="col" className="table_heading">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {products
                    .filter((product) => {
                      return product.title
                        .toLowerCase()
                        .includes(query.toLowerCase());
                    })
                    .map((item, index) => {
                      // console.log(item);
                      return (
                        <tr key={index} className="table_body_tr">
                          <td className="table_data">{index + 1}</td>
                          <td
                            scope="row"
                            className="table_data font-medium text-gray-900 whitespace-nowrap  hover:text-blue-500 hover:underline border-gray-700"
                          >
                            # {item?._id}
                          </td>
                          <td className="table_data">{item?.title}</td>
                          <td className="table_data">Rs.{item?.price}</td>
                          <td className="table_data">
                            {item?.variants.length}
                          </td>
                          <td className="table_data">
                            <img
                              onClick={() => {
                                showAllImages(index);
                                // ref.current?.scrollIntoView({
                                //   behavior: "smooth",
                                // });
                                window.scroll(0, 0);
                              }}
                              className="w-auto h-[100px] mx-auto"
                              src={item?.mainImage}
                              alt="This is the product image here"
                            />
                          </td>
                          <td className="table_data w-[170px]">
                            {item.availableQty !== 0 ? (
                              item.availableQty
                            ) : (
                              <span className="py-1 px-4 text-center bg-red-600 text-white">
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
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-600 text-2xl font-ubuntu">
              No products to show!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
