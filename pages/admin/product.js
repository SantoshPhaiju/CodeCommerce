import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainConfig from "./components/MainConfig";
import Product from "../../models/Product";
import mongoose from "mongoose";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { addProduct } from "../slices/productSlice";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Variants from "../../models/Variants";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ProductPage = ({ product }) => {
  const [desc, setDesc] = useState(product.desc);
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

  console.log(product);
  const [showSideBar, setShowSidebar] = useState(true);
  const router = useRouter();

  // console.log(router.query.id);
  const { id } = router.query;
  useEffect(() => {
    if (router.query.id === undefined) {
      router.push("/admin/allproducts");
    }
  }, []);

  const [selectedImage, setSelectedImage] = useState([]);
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (index === open) {
      console.log(open, index);
      setOpen(null);
      return;
    }
    console.log(open, index);
    setOpen(index);
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
      handleSubmit();
    } else {
      alert("You cannot upload more than 4 images");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    const formdata = new FormData();
    console.log(file);
    Object.values(file).forEach((file) => {
      formdata.append("img", file);
    });

    for (var key of formdata.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log(file);
    dispatch(updateImage({ formdata, toast }));
    setFile("");
    setSelectedImage([]);
  };
  return (
    <>
      <MainConfig showSideBar={showSideBar} setShowSidebar={setShowSidebar} />

      <div
        className={`main pl-0 transition-all duration-300 mt-24 min-h-[100vh] ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <Link
          href={"/admin/allproducts"}
          className={
            "flex gap-2 items-center transition-all duration-300 font-firasans text-lg my-4 ml-10 font-bold text-gray-500 hover:text-gray-800"
          }
        >
          <BsArrowLeft />
          <span>All Products</span>
        </Link>

        <div className="product mx-10 px-4 py-2">
          <div className="border flex bg-white p-3 shadow-lg shadow-gray-500/40 w-[60vw]">
            <div className="images flex gap-4 w-full">
              <div className="mainImageContainer border rounded-md overflow-hidden relative h-[300px] w-[30vw] cursor-pointer">
                <img
                  className="w-full h-full"
                  src={product.mainImage}
                  alt="product img"
                />
                <div className="imgOverlay transition-all duration-300 absolute h-full w-full bg-slate-900/70 flex items-center justify-center -bottom-20 group-hover:bottom-0 hover:bottom-0 opacity-0 hover:opacity-100">
                  <span className="text-white font-ubuntu text-xl z-40">
                    Main Image
                  </span>
                </div>
              </div>
              <div className="otherImagesContainer flex flex-wrap gap-4 w-[70vw] h-[300px]">
                {product.img.map((image, index) => {
                  return (
                    <div className="relative w-[130px] h-[130px] group cursor-pointer overflow-hidden">
                      <img
                        className="w-full h-full rounded-md border"
                        src={image}
                        key={index}
                        alt="Product img"
                      />
                      <div className="imgOverlay rounded-md cursor-pointer transition-all duration-300 absolute h-full w-full bg-slate-900/70 flex items-center justify-center -bottom-20 group-hover:bottom-0 hover:bottom-0 opacity-0 group-hover:opacity-100 hover:opacity-100">
                        <span className="text-white font-ubuntu text-lg z-40">
                          Sub Image
                        </span>
                      </div>
                    </div>
                  );
                })}

                {product.img.length < 4 && (
                  <>
                    <label htmlFor="img">
                      <div className="upload border-2 border-dashed border-black flex justify-center items-center h-[130px] w-[130px] flex-col cursor-pointer">
                        <FiUpload />
                        <span className="text-lg font-firasans">Upload</span>
                      </div>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      name="img"
                      id="img"
                      onChange={handleUploadImage}
                      multiple
                    />
                  </>
                )}
                {selectedImage &&
                  selectedImage.map((image, index) => {
                    // console.log("image: ", selectedImage);
                    return (
                      <img
                        key={index}
                        className="h-[130px] w-[130px] rounded-md cursor-pointer"
                        src={image}
                        alt=""
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="generalDetails bg-white p-3 shadow-lg shadow-gray-500/40 w-[60vw] my-4">
            <h1 className="text-2xl text-gray-800 font-firasans my-2">
              General Details:-
            </h1>
            <div className="px-4 py-2 w-full h-auto">
              <div className="formGroup my-2">
                <label htmlFor="title" className="label">
                  Title:-
                </label>
                <input
                  className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                  type="text"
                  value={product.title}
                  readOnly
                />
              </div>
              <div className="formGroup my-2">
                <label htmlFor="desc" className="label text-lg">
                  Description:-
                </label>
                <div className="description h-[200px]">
                  <QuillNoSSRWrapper
                    className="h-[70%] flex-1 w-full font-firasans text-lg cursor-not-allowed"
                    value={desc}
                    onChange={setDesc}
                    modules={modules}
                    formats={formats}
                    // placeholder={"Enter the description of the product here."}
                    theme="snow"
                    readOnly
                  />
                </div>
              </div>

              <div className="formGroup my-2">
                <label htmlFor="title" className="label">
                  Price:-
                </label>
                <input
                  className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                  type="number"
                  value={product.price}
                  readOnly
                />
              </div>

              <div className="formGroup my-2">
                <label htmlFor="title" className="label">
                  Stock:-
                </label>
                <input
                  className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                  type="number"
                  value={product.availableQty}
                  readOnly
                />
              </div>
              <div className="formGroup my-2">
                <label htmlFor="title" className="label">
                  Status:-
                </label>
                <input
                  className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                  type="text"
                  value={product.status}
                  readOnly
                />
              </div>

              {product.category === "Tshirts" && (
                <div className="formGroup my-2">
                  <label htmlFor="color" className="label">
                    Color:-
                  </label>
                  <input
                    className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                    type="text"
                    value={product.color}
                    readOnly
                  />
                </div>
              )}
              {product.category === "Tshirts" && (
                <div className="formGroup my-2">
                  <label htmlFor="title" className="label">
                    Size:-
                  </label>
                  <input
                    className="input_field bg-gray-400 rounded-sm border-none outline-none text-white cursor-not-allowed"
                    type="text"
                    value={product.size}
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>

          {product.variants.length !== 0 && <div className="variants bg-white shadow-lg shadow-gray-500/40 w-[60vw] my-4 mb-12 py-2 px-4">
            <h1 className="text-2xl text-gray-800 font-firasans my-2">
              Variants:-
            </h1>

            <div className="variantsContainer flex gap-4 flex-col">
              {product.variants.map((variant, index) => {
                return (
                  <div
                    className={`variant w-full border border-gray-600 transition-all duration-500 ease-in-out `}
                    key={index}
                  >
                    <div
                      className="header cursor-pointer flex items-center justify-between border p-3"
                      onClick={() => toggle(index)}
                    >
                      <span className=" font-firasans">{variant.title}</span>
                      <div className="float-right flex items-center gap-2 transition-all duration-300">
                        {open !== index ? (
                          <MdArrowDropDown className="text-xl float-right text-center" />
                        ) : (
                          <MdArrowDropUp className="text-xl float-right text-center" />
                        )}
                      </div>
                    </div>
                    <div
                      className={`body transition-all duration-500 ease-in-out ${
                        open === index
                          ? "h-[100vh] overflow-auto py-2 px-4"
                          : "h-[0px] overflow-hidden py-0 px-0"
                      }`}
                    >
                      <div className="variantDetails">
                        <div className="variantImages flex flex-wrap gap-28">
                          <div className="mainImage">
                            <p className="text-xl font-ubuntu my-2">
                              Main Image:-
                            </p>
                            <img
                              src={variant.mainImage}
                              className="w-[150px] h-[150px]"
                              alt="this is the image here"
                            />
                          </div>
                          <div className="sub-images">
                            <p className="text-xl font-ubuntu my-2">
                              Sub Images:-
                            </p>
                            <div className="imagecontainer flex gap-2">
                              {variant.img.map((img, index) => {
                                return (
                                  <div>
                                    <img
                                      src={img}
                                      key={index}
                                      className="w-[150px] h-[150px]"
                                      alt="this is the image here"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <hr className="bg-black my-4  border-gray-400" />
                        <div className="generalDetails">
                          <div className="formGroup my-2">
                            <label htmlFor="title">Title:-</label>
                            <input
                              type="text"
                              className="input_field"
                              value={variant.title}
                            />
                          </div>
                          <div className="formGroup my-2">
                            <label htmlFor="desc" className="label text-lg">
                              Description:-
                            </label>
                            <div className="description h-[200px]">
                              <QuillNoSSRWrapper
                                className="h-[70%] flex-1 w-full font-firasans text-lg"
                                value={variant.desc}
                                // onChange={setDesc}
                                modules={modules}
                                formats={formats}
                                // placeholder={"Enter the description of the product here."}
                                theme="snow"
                              />
                            </div>
                          </div>

                          <div className="formGroup my-2">
                            <label htmlFor="title">Price:-</label>
                            <input
                              type="text"
                              className="input_field"
                              value={variant.price}
                            />
                          </div>

                          <div className="formGroup my-2">
                            <label htmlFor="status">Status:-</label>
                            <input
                              type="text"
                              className="input_field"
                              value={variant.status}
                            />
                          </div>

                          <div className="formGroup my-2">
                            <label htmlFor="title">Stock:-</label>
                            <input
                              type="text"
                              className="input_field"
                              value={variant.availableQty}
                            />
                          </div>

                          {product.category === "Tshirts" && (
                            <div className="formGroup my-2">
                              <label htmlFor="color" className="label">
                                Color:-
                              </label>
                              <input
                                className="input_field "
                                type="text"
                                value={variant.color}
                              />
                            </div>
                          )}
                          {product.category === "Tshirts" && (
                            <div className="formGroup my-2">
                              <label htmlFor="title" className="label">
                                Size:-
                              </label>
                              <input
                                className="input_field "
                                type="text"
                                value={variant.size}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findById(context.query.id)
  .populate({
    path: "variants",
    model: Variants,
    options: { lead: true },
  })
  //   console.log(context.query.id);
  // console.log(context);
  if (product === null) {
    product = {};
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}

export default ProductPage;
