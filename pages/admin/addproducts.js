import React, { useRef, useState, Component, useEffect } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import dynamic from "next/dynamic";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../slices/productSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "../slices/categorySlice";
import { FiUpload } from "react-icons/fi";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const AddProducts = () => {
  const background = [
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#000000",
    "#e60000",
    "#ff9900",
    "blue",
    "red",
    "orange",
    "purple",
    "indigo",
    "pink",
    "#fa90fe",
    "#aa9900",
    "yellow",
    "green",
    "slate",
  ];
  const colors = [
    "#000000",
    "#e60000",
    "#ff9900",
    "blue",
    "red",
    "orange",
    "purple",
    "indigo",
    "pink",
    "#fa90fe",
    "#aa9900",
    "yellow",
    "green",
    "slate",
  ];
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code",
        "code-block",
      ],
      [{ color: colors }, { background: background }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "code",
    "background",
    "code-block",
    "color",
    "bullet",
    "indent",
    "link",
  ];

  const [showSideBar, setShowSidebar] = useState(true);
  const categories = useSelector((state) => state.category.categories);
  const sideBarRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("admin-token")) {
      router.push("/admin/login");
    }
  }
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [desc, setDesc] = useState("");
  // console.log(desc);
  const [data, setData] = useState({
    title: "",
    category: "",
    price: "",
    status: "",
    availableQty: "",
    color: "",
    size: "Select size",
  });

  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedMainImage, setSelectedMainImage] = useState("");
  const [file, setFile] = useState("");
  const [mainFile, setMainFile] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files && selectedImage.length < 4) {
      let files = [];
      Object.keys(e.target.files).map((img) => {
        console.log(e.target.files[img]);
        files.push(e.target.files[img]);
      });
      // console.log(files);
      const imgUrl = files.map((file, index) => {
        // console.log("file", file);
        // console.log("urls: ", URL.createObjectURL(file));
        return URL.createObjectURL(file);
      });
      setSelectedImage(imgUrl);
      // setSelectedImage(URL.createObjectURL(e.target.files[0]));
      // setFile(files);
      setFile(e.target.files);
      // console.log(selectedImage);
    } else {
      alert("You cannot upload more than 4 images");
    }
  };
  const handleUploadMainImage = (e) => {
    console.log("mainfile", e.target.files);
    // if (e.target.files) {
    //   // console.log(e.target.files[0])
    //   const imgUrl = URL.createObjectURL(e.target.files[0]);
    //   // console.log(imgUrl);
    //   setSelectedMainImage(imgUrl);
    //   setMainFile(e.target.files[0]);
    // }
    if (e.target.files && selectedMainImage.length < 2) {
      let files = [];
      Object.keys(e.target.files).map((img) => {
        console.log(e.target.files[img]);
        files.push(e.target.files[img]);
      });
      // console.log(files);
      const imgUrl = files.map((file, index) => {
        // console.log("file", file);
        // console.log("urls: ", URL.createObjectURL(file));
        return URL.createObjectURL(file);
      });
      setSelectedMainImage(imgUrl);
      // setSelectedImage(URL.createObjectURL(e.target.files[0]));
      // setFile(files);
      setMainFile(e.target.files);
      // console.log(selectedImage);
    } else {
      alert("You cannot upload more than 1 images");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    if (!mainFile) return;
    // console.log("mainfile new", mainFile);
    const formdata = new FormData();
    // console.log(file);
    Object.values(file).forEach((file) => {
      formdata.append("img", file);
    });
    Object.values(mainFile).forEach((file) => {
      formdata.append("mainImage", file);
      // console.log(file);
    });
    formdata.append("title", data.title);
    formdata.append("desc", desc);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("color", data.color);
    formdata.append("size", data.size);
    for (var i = 0; i < sizes.length; i++) {
      formdata.append("sizes", sizes[i]);
    }
    // formdata.append("sizes", [sizes]);
    formdata.append("status", data.status);
    formdata.append("availableQty", data.availableQty);
    // for (var key of formdata.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    // console.log(file);
    dispatch(addProduct({ formdata, toast }));
    setData({
      title: "",
      desc: "",
      category: "Select one category",
      price: "",
      status: "",
      availableQty: "",
      color: "",
      size: "Select size",
    });
    setFile("");
    setSelectedImage([]);
    setMainFile("");
    setSelectedMainImage("");
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
        <div className="maindiv text-black pt-0.5 mx-2 lg:mx-10">
          <h1 className="font-roboto text-2xl my-4 mx-4 text-blue-800">
            Add Products
          </h1>

          <form
            className=""
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="productDescriptionContainer grid grid-cols-12 gap-10">
              <div className="productDescriptionLeft col-span-12 lg:col-span-8 shadow-lg shadow-gray-600/30 border bg-white h-[500px] py-4 px-4 w-[95vw] md:w-full">
                <div className="formGroup my-2">
                  <label htmlFor="title" className="label text-lg">
                    Title:-
                  </label>
                  <input
                    className="input_field rounded-sm"
                    name="title"
                    id="title"
                    placeholder="Ex:Coding Nepal Tshirt 🤞"
                    type="text"
                    required={true}
                    value={data.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="formGroup my-2">
                  <label htmlFor="desc" className="label text-lg">
                    Description:-
                  </label>
                  <div className="description h-[200px] mb-12">
                    <QuillNoSSRWrapper
                      className="h-[70%] flex-1 w-full font-firasans text-lg"
                      value={desc}
                      onChange={setDesc}
                      modules={modules}
                      formats={formats}
                      placeholder={"Enter the description of the product here."}
                      theme="snow"
                    />
                  </div>
                </div>
                <div className="formGroup my-2">
                  <label htmlFor="catgory" className="label text-lg">
                    Select Category:-
                  </label>
                  <select
                    className="input_field text-gray-900 rounded-sm"
                    name="category"
                    id="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">----- Select Category -----</option>
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <option value={category.name} key={index}>
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="productDescriptionRight col-span-12 lg:col-span-4 h-[500px] shadow-lg shadow-gray-600/30 border bg-white py-4 px-4 w-[95vw] md:w-full">
                <div className="formGroup">
                  <label htmlFor="price" className="label text-lg">
                    Price:-
                  </label>
                  <input
                    className="input_field rounded-sm"
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Ex:300.00"
                    value={data.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="availableQty" className="label text-lg">
                    Stock:-
                  </label>
                  <input
                    className="input_field rounded-sm"
                    type="number"
                    name="availableQty"
                    id="availableQty"
                    placeholder="Ex:10 units"
                    value={data.availableQty}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="availableQty" className="label text-lg">
                    Status:-
                  </label>
                  <select
                    className="input_field text-gray-900 rounded-sm"
                    name="status"
                    id="status"
                    value={data.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">----- Select Status -----</option>

                    <option value={"active"}>Active</option>
                    <option value={"inactive"}>InActive</option>
                  </select>
                </div>
                {data.category === "Tshirts" && (
                  <div className="formGroup">
                    <label htmlFor="color" className="label text-lg">
                      Color:-
                    </label>
                    <input
                      className="input_field rounded-sm"
                      type="text"
                      name="color"
                      id="color"
                      placeholder="Ex:Blue"
                      value={data.color}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {data.category === "Tshirts" && (
                  <div className="formGroup">
                    <label htmlFor="size" className="label text-lg">
                      Size:-
                    </label>
                    <select
                      className="input_field text-gray-900 rounded-sm"
                      name="size"
                      id="size"
                      value={data.size}
                      onChange={handleChange}
                      required
                    >
                      <option value="">----- Select Size -----</option>

                      <option value={"Sm"}>Small</option>
                      <option value={"Md"}>Medium</option>
                      <option value={"Lg"}>Large</option>
                      <option value={"Xl"}>Extra large</option>
                      <option value={"XXl"}>Extra extra large</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="images mt-10 mb-10 h-auto shadow-lg shadow-gray-600/30 bg-white p-5 border">
              <h2 className="text-2xl font-rubik mb-2">Add Images:-</h2>

              <div className="imageContainer grid grid-cols-12 gap-4">
                <div className="mainImageContainer col-span-12 lg:col-span-5 py-2 px-0 lg:px-4">
                  <h2 className="text-lg font-firasans my-3">Main Image:</h2>
                  <div className="mainImagecontainer flex  space-x-2">
                    {/*  {selectedImage.length > 0 &&
                      selectedImage.map((img, index) => {
                        return (
                          <div className="w-[150px] h-[150px]" key={index}>
                            <img
                              className="cursor-pointer border-2 border-black rounded-md h-full w-full"
                              src={img}
                              alt="Image need to be here."
                            />
                          </div>
                        );
                      })} */}
                    {selectedMainImage &&
                      selectedMainImage.map((img, index) => {
                        return (
                          <div className="w-[260px] h-[260px]" key={index}>
                            <img
                              className="cursor-pointer border-2 border-black rounded-md h-full w-full"
                              src={img}
                              alt="Image need to be here."
                            />
                          </div>
                        );
                      })}
                    <label htmlFor="mainImage">
                      <div className="selectMainImage flex justify-center items-center flex-col text-center font-firasans cursor-pointer border-2 border-black border-dashed rounded-md h-[260px] w-[260px] ">
                        <FiUpload />
                        <span>Upload Main Image</span>
                      </div>
                    </label>
                    <input
                      className="hidden"
                      name="mainImage"
                      id="mainImage"
                      type="file"
                      onChange={handleUploadMainImage}
                    />
                  </div>
                </div>
                <div className="subImageContainer col-span-12 lg:col-span-7 py-2 px-4">
                  <h2 className="text-lg font-firasans my-3">Sub Images:</h2>
                  <div className="subImages  flex flex-wrap gap-4">
                    {selectedImage.length > 0 &&
                      selectedImage.map((img, index) => {
                        return (
                          <div className="w-[150px] h-[150px]" key={index}>
                            <img
                              className="cursor-pointer border-2 border-black rounded-md h-full w-full"
                              src={img}
                              alt="Image need to be here."
                            />
                          </div>
                        );
                      })}

                    <label htmlFor="img">
                      <div className="selectSubImages flex justify-center items-center flex-col text-center font-firasans cursor-pointer border-2 border-black border-dashed rounded-md h-[150px] w-[150px]">
                        <FiUpload />
                        <span>Upload Sub Images:-</span>
                      </div>
                    </label>
                    <input
                      className="hidden"
                      name="img"
                      id="img"
                      type="file"
                      onChange={handleUploadImage}
                      multiple
                    />
                  </div>
                  <p className="text-sm font-firasans text-gray-500 my-4">
                    You can upload upto only 4 sub images
                  </p>
                </div>
              </div>
            </div>

            <div className="buttonDiv flex justify-start h-16 mb-10">
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
