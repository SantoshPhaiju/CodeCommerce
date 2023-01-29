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
import {
  addProduct,
  fetchProducts,
  updateImages,
  updateProductDetails,
} from "../slices/productSlice";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Variants from "../../models/Variants";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

  // console.log(product);
  const [showSideBar, setShowSidebar] = useState(true);
  const [updateDetails, setUpdateDetails] = useState(false);
  const router = useRouter();
  const [updateImage, setUpdateImage] = useState(false);
  const dispatch = useDispatch();

  // console.log(router.query.id);
  const { id } = router.query;
  useEffect(() => {
    if (router.query.id === undefined) {
      router.push("/admin/allproducts");
    }
    dispatch(fetchProducts());
  }, []);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [selectedImage, setSelectedImage] = useState([]);
  const [showVariants, setShowVariants] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState("");
  const [mainFile, setMainFile] = useState("");
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: product.title,
    price: product.price,
    color: product.color,
    availableQty: product.availableQty,
    size: product.size,
    status: product.status,
  });

  // console.log(productDetails);

  const [productDesc, setProductDesc] = useState(product.desc);

  const handleProductDetailsChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const toggle = (index) => {
    if (index === open) {
      // console.log(open, index);
      setOpen(null);
      return;
    }
    // console.log(open, index);
    setOpen(index);
  };

  const handleUploadMainImage = (e) => {
    console.log("mainfile", e.target.files);
    if (e.target.files && selectedMainImage.length < 2) {
      let files = [];
      Object.keys(e.target.files).map((img) => {
        console.log(e.target.files[img]);
        files.push(e.target.files[img]);
      });
      const imgUrl = files.map((file, index) => {
        return URL.createObjectURL(file);
      });
      setSelectedMainImage(imgUrl);
      setMainFile(e.target.files);

      if (!mainFile) return;
      const formdata = new FormData();
      Object.values(mainFile).forEach((file) => {
        formdata.append("mainImage", file);
        // console.log(file);
      });
      dispatch(addProduct({ formdata, toast }));
      setMainFile("");
      setSelectedMainImage("");
    } else {
      alert("You cannot upload more than 1 images");
    }
  };
  // console.log(updateDetails);

  const handleUploadImage = (e) => {
    if (e.target.files && selectedImage.length < 4) {
      let files = [];
      Object.keys(e.target.files).map((img) => {
        console.log(e.target.files[img]);
        files.push(e.target.files[img]);
      });
      const imgUrl = files.map((file, index) => {
        return URL.createObjectURL(file);
      });
      setSelectedImage(imgUrl);
      setFile(e.target.files);
    } else {
      alert("You cannot upload more than 4 images");
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    setUpdateImage(false);
    dispatch(fetchProducts());
    if (!file && !mainFile) return;

    const formdata = new FormData();
    console.log(file);
    Object.values(file).forEach((file) => {
      formdata.append("img", file);
      console.log("imgfile", file);
    });
    Object.values(mainFile).forEach((file) => {
      formdata.append("mainImage", file);
      console.log("mainfile", file);
    });
    for (var key of formdata.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log(file);

    // console.log(file);
    dispatch(updateImages({ formdata, toast, id }));
    setFile("");
    setSelectedImage([]);
    setMainFile("");
    setSelectedMainImage([]);
    setTimeout(() => {
      refreshData();
    }, 1000);
  };

  const handleUpdateDetails = () => {
    setUpdateDetails(false);
    console.log(productDetails, productDesc);

    setTimeout(() => {
      refreshData();
    }, 1000);
    dispatch(updateProductDetails({ productDetails, productDesc, toast, id }));
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
          <div className="border bg-white p-3 shadow-lg shadow-gray-500/40 w-[60vw]">
            <div className="images grid grid-cols-12 w-full gap-4">
              <div
                className={`mainImageContainer border rounded-md overflow-hidden relative py-2 ${
                  updateImage === true
                    ? "h-auto col-span-7"
                    : "h-[300px] col-span-5"
                }  cursor-pointer flex justify-center gap-2`}
              >
                {updateImage === true ? (
                  <>
                    {selectedMainImage &&
                      selectedMainImage.map((img, index) => {
                        return (
                          <div className="w-[300px] h-[300px]" key={index}>
                            <img
                              className="cursor-pointer border-2 border-black rounded-md h-[300px] w-[300px]"
                              src={img}
                              alt="Image need to be here."
                            />
                          </div>
                        );
                      })}
                    <label htmlFor="mainImage">
                      <div className="selectMainImage flex justify-center items-center flex-col text-center font-firasans cursor-pointer border-2 border-black border-dashed rounded-md h-[300px] w-[300px]">
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
                  </>
                ) : (
                  <img
                    className="w-full h-full"
                    src={product.mainImage}
                    alt="product img"
                  />
                )}
              </div>
              <div
                className={`otherImagesContainer py-2 border rounded-sm px-2 flex flex-wrap gap-4 ${
                  updateImage === true
                    ? "h-auto col-span-5"
                    : "col-span-7 h-auto"
                }`}
              >
                {updateImage === false &&
                  product.img.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="relative w-[130px] h-[130px] group cursor-pointer overflow-hidden"
                      >
                        <img
                          className="w-full h-full rounded-md border"
                          src={image}
                          key={index}
                          alt="Product img"
                        />
                      </div>
                    );
                  })}

                {updateImage === true && (
                  <>
                    {selectedImage.length > 0 &&
                      selectedImage.map((img, index) => {
                        return (
                          <div className="w-[130px] h-[130px]" key={index}>
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
                        <span>Upload Sub Images</span>
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
                  </>
                )}
              </div>
            </div>
            {updateImage === false && (
              <div>
                <button
                  className="normal_btn my-2"
                  onClick={() => setUpdateImage(true)}
                >
                  Update Images
                </button>
              </div>
            )}

            {updateImage === true && (
              <div className="flex gap-4 my-3">
                <button
                  className="normal_btn"
                  onClick={() => setUpdateImage(false)}
                >
                  Cancel
                </button>
                <button
                  className="normal_btn bg-green-600 hover:bg-green-800"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            )}
          </div>
          <div className="generalDetails bg-white p-3 shadow-lg shadow-gray-500/40 w-[60vw] my-4">
            <h1 className="text-2xl text-gray-800 font-firasans my-2">
              General Details:-
            </h1>
            <div className="px-4 py-2 w-full h-auto">
              {updateDetails === false && (
                <>
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

                  <div className="belowContainer grid grid-cols-12 gap-3">
                    <div className="left col-span-6">
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
                    </div>

                    <div className="right col-span-6">
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
                </>
              )}
              {updateDetails === true && (
                <>
                  <div className="formGroup my-2">
                    <label htmlFor="title" className="label">
                      Title:-
                    </label>
                    <input
                      className="input_field"
                      type="text"
                      name="title"
                      id="title"
                      value={productDetails.title}
                      onChange={handleProductDetailsChange}
                    />
                  </div>
                  <div className="formGroup my-2">
                    <label htmlFor="desc" className="label text-lg">
                      Description:-
                    </label>
                    <div className="description h-[200px]">
                      <QuillNoSSRWrapper
                        id="desc"
                        className="h-[70%] flex-1 w-full font-firasans"
                        value={productDesc}
                        onChange={setProductDesc}
                        modules={modules}
                        formats={formats}
                        // placeholder={"Enter the description of the product here."}
                        theme="snow"
                      />
                    </div>
                  </div>

                  <div className="belowContainer grid grid-cols-12 gap-3">
                    <div className="left col-span-6">
                      <div className="formGroup my-2">
                        <label htmlFor="price" className="label">
                          Price:-
                        </label>
                        <input
                          name="price"
                          id="price"
                          className="input_field"
                          type="number"
                          value={productDetails.price}
                          onChange={handleProductDetailsChange}
                        />
                      </div>

                      <div className="formGroup my-2">
                        <label htmlFor="availableQty" className="label">
                          Stock:-
                        </label>
                        <input
                          className="input_field"
                          name="availableQty"
                          id="availableQty"
                          type="number"
                          value={productDetails.availableQty}
                          onChange={handleProductDetailsChange}
                        />
                      </div>
                      <div className="formGroup my-2">
                        <label htmlFor="status" className="label">
                          Status:-
                        </label>
                        <select
                          className="input_field"
                          name="status"
                          id="status"
                          value={productDetails.status}
                          onChange={handleProductDetailsChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">InActive</option>
                        </select>
                      </div>
                    </div>

                    <div className="right col-span-6">
                      {product.category === "Tshirts" && (
                        <div className="formGroup my-2">
                          <label htmlFor="color" className="label">
                            Color:-
                          </label>
                          <input
                            className="input_field"
                            type="text"
                            name="color"
                            id="color"
                            value={productDetails.color}
                            onChange={handleProductDetailsChange}
                          />
                        </div>
                      )}
                      {product.category === "Tshirts" && (
                        <div className="formGroup my-2">
                          <label htmlFor="size" className="label">
                            Size:-
                          </label>
                          <select
                            className="input_field"
                            name="size"
                            id="size"
                            value={productDetails.size}
                            onChange={handleProductDetailsChange}
                          >
                            <option value="Sm">Small</option>
                            <option value="Md">Medium</option>
                            <option value="Lg">Large</option>
                            <option value="Xl">Extra large</option>
                            <option value="XXl">Extra Extra large</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {updateDetails === false && (
                <div className="buttons">
                  <button
                    className="normal_btn"
                    onClick={() => setUpdateDetails(true)}
                  >
                    Update Details
                  </button>
                </div>
              )}
              {updateDetails === true && (
                <div className="buttons">
                  <div className="flex gap-4 my-3">
                    <button
                      className="normal_btn"
                      onClick={() => setUpdateDetails(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="normal_btn bg-green-600 hover:bg-green-800"
                      onClick={handleUpdateDetails}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="button my-4">
            <button
              className="normal_btn"
              onClick={() => setShowVariants(true)}
            >
              Show Variants
            </button>
          </div>

          {product.variants.length !== 0 && showVariants && (
            <div className="variants bg-white shadow-lg shadow-gray-500/40 w-[60vw] my-4 mb-12 py-2 px-4">
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
                                    <div key={index}>
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
                                readOnly
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
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="formGroup my-2">
                              <label htmlFor="title">Price:-</label>
                              <input
                                type="text"
                                className="input_field"
                                value={variant.price}
                                readOnly
                              />
                            </div>

                            <div className="formGroup my-2">
                              <label htmlFor="status">Status:-</label>
                              <input
                                type="text"
                                className="input_field"
                                value={variant.status}
                                readOnly
                              />
                            </div>

                            <div className="formGroup my-2">
                              <label htmlFor="title">Stock:-</label>
                              <input
                                type="text"
                                className="input_field"
                                value={variant.availableQty}
                                readOnly
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
                                  className="input_field "
                                  type="text"
                                  value={variant.size}
                                  readOnly
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="buttons my-3">
                          <button className="normal_btn" onClick={() => console.log(variant._id)}>Update Variant</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findById(context.query.id).populate({
    path: "variants",
    model: Variants,
    options: { lead: true },
  });
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
