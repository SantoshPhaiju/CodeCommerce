import React, { useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addProduct } from "../slices/productSlice";

const AddProducts = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const sideBarRef = useRef();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    slug: "",
    desc: "",
    category: "",
    price: "",
    availableQty: "",
    color: "",
    size: "",
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!file) return;
    const formdata = new FormData();
    console.log(file);
    formdata.append("img", file);
    formdata.append("title", data.title);
    formdata.append("desc", data.desc);
    formdata.append("slug", data.slug);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("color", data.color);
    formdata.append("size", data.size);
    formdata.append("availableQty", data.availableQty);
    console.log(formdata.entries());
    for (var key of formdata.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    dispatch(addProduct(formdata)); 
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
        <div className="maindiv text-black pt-0.5 mx-10">
          <h1 className="font-roboto text-2xl my-4 mx-4 text-blue-800">
            Add Products
          </h1>

          <form
            className="border w-[30vw] mx-auto px-4 py-5 shadow-lg shadow-gray-500/50 mb-12"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="title" className="text-xl">
                Enter Title
              </label>
              <input
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title of the product"
                value={data.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="slug" className="text-xl">
                Enter Slug
              </label>
              <input
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                type="text"
                name="slug"
                id="slug"
                placeholder="Enter the slug of the product"
                value={data.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="desc" className="text-xl">
                Enter Description
              </label>
              <textarea
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                name="desc"
                id="desc"
                cols="20"
                rows="3"
                placeholder="Description of the product"
                value={data.desc}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="category" className="text-xl">
                Select Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                defaultValue={"Select one category"}
                value={data.category}
                onChange={handleChange}
              >
                <option value="Select one category" disabled>
                  Select one category
                </option>
                <option value="tshirt">Tshrit</option>
                <option value="book">Book</option>
                <option value="hoodie">Hoodie</option>
                <option value="mugs">Mugs</option>
              </select>
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="price" className="text-xl">
                Enter Price
              </label>
              <input
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                type="number"
                name="price"
                id="price"
                placeholder="Enter the price of the product"
                value={data.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="availableQty" className="text-xl">
                Enter AvailabeQty
              </label>
              <input
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                type="number"
                name="availableQty"
                id="availableQty"
                placeholder="Enter the availableQty of the product"
                value={data.availableQty}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="availableQty" className="text-xl">
                Enter Color
              </label>
              <input
                className="w-full rounded-md border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                type="text"
                name="color"
                id="color"
                placeholder="Enter the color of the product"
                value={data.color}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="size" className="text-xl">
                Select Size
              </label>
              <select
                name="category"
                id="category"
                className="w-full border-2 text-lg py-1 px-4 outline-pink-500 border-blue-700"
                defaultValue={"Select size"}
                value={data.size}
                onChange={handleChange}
              >
                <option value="Select size" disabled>
                  Select Size
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="formGroup mx-auto font-firasans w-full flex flex-col my-2 space-y-1">
              <label htmlFor="img">
                <div className="label flex py-2 justify-start items-center border-2 mt-3 border-blue-700 space-x-6 px-6 cursor-pointer">
                  <BsFillImageFill className="text-xl" />
                  <p>Select Image</p>
                </div>
                <input
                  className="hidden"
                  type="file"
                  name="img"
                  id="img"
                  onChange={handleUploadImage}
                />
                {selectedImage && (
                  <img
                    className="w-full h-72 px-20 my-4"
                    src={selectedImage}
                    height={200}
                    width={200}
                    alt=""
                  />
                )}
              </label>
            </div>
            <div className="buttonDiv flex justify-end">
              <button className="py-2 px-10 bg-pink-500 text-white font-firasans rounded-sm hover:bg-pink-700 shadow-lg shadow-gray-600/60 my-2">
                Publish Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
