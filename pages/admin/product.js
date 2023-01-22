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

const ProductPage = ({ product }) => {
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

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files && selectedImage.length <= 5) {
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
      alert("You cannot upload more than 5 images");
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
          <span>Orders</span>
        </Link>

        <div className="product mx-10 px-4 py-2">
          <div className="flex bg-white p-3 shadow-lg shadow-gray-500/40 w-[60vw]">
            <div className="images flex gap-4 w-full">
              <div className="mainImageContainer border rounded-md overflow-hidden relative h-[300px] w-[30vw] cursor-pointer">
                <img
                  className="w-full h-full"
                  src={product.img[0]}
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

                {product.img.length < 5 && (
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
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findById(context.query.id);
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
