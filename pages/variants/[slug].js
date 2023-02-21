import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { toast } from "react-toastify";
import Error from "next/error";
import baseUrl from "../../helpers/baseUrl";
import Variants from "../../models/Variants";
import renderHTML from "react-render-html";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Slug = ({
  buyNow,
  addToCart,
  product,
  variant,
  colors,
  sizes,
  error,
}) => {
  // console.log(product, variants);
  // console.log(variants[1].color);
  if (error === 404) {
    return <Error statusCode={404} />;
  }
  console.log(product);
  // console.log(colors, sizes);
  const router = useRouter();
  const { slug } = router.query;

  const [selectImage, setSelectImage] = useState(variant.mainImage);
  const [color, setColor] = useState(variant.color);
  const [size, setSize] = useState(variant.size);
  
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  const checkServiceability = async () => {
    let pins = await fetch(`${baseUrl}/api/pincode`);
    let pinJson = await pins.json();
    console.log(pinJson);
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your pincode is serviceable");
      setTimeout(() => {
        setService(null);
      }, 5000);
    } else {
      setService(false);
      toast.error("Sorry! Your pincode is not serviceable yet!");
      setTimeout(() => {
        setService(null);
      }, 5000);
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };
  //   const [productSlug, setProductSlug] = useState(product.slug);

  const refreshVariant = (product) => {
    router.push(`/variants/${product.slug}`);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <Link
            href={`/products/${product.slug}`}
            className={
              "transition-all duration-200 flex gap-2 font-firasans items-center hover:text-black text-lg hover:font-medium hover:scale-105"
            }
          >
            <AiOutlineArrowLeft />
            <span>Back to Parent Product</span>
          </Link>
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="images flex flex-wrap flex-row lg:flex-col gap-4 lg:space-y-2 justify-center lg:justify-start lg:w-[150px] w-[100%] h-auto mb-5 lg:mb-0">
              <div
                className={` transition-all duration-300 h-[100px] w-[150px] lg:w-full rounded border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-600/80 hover:border hover:border-black hover:scale-110 ${
                  selectImage === variant.mainImage
                    ? "border shadow-lg shadow-green-600/80 border-black scale-110"
                    : "border-2"
                }`}
              >
                <img
                  alt="ecommerce"
                  className={`w-full h-full object-contain`}
                  src={variant.mainImage}
                  onClick={(e) => {
                    setSelectImage(e.target.src);
                  }}
                  onMouseEnter={(e) => {
                    setSelectImage(e.target.src);
                  }}
                />
              </div>
              {variant.img.map((image, index) => {
                return (
                  <div
                    className={` transition-all duration-300 h-[100px] w-[150px] lg:w-full rounded border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-600/80 hover:border hover:border-black hover:scale-110 ${
                      selectImage === image
                        ? "border shadow-lg shadow-green-600/80 border-black scale-110"
                        : "border-2"
                    }`}
                    key={index}
                  >
                    <img
                      alt="ecommerce"
                      className={`w-full h-full object-contain`}
                      src={image}
                      onClick={(e) => {
                        setSelectImage(e.target.src);
                      }}
                      onMouseEnter={(e) => {
                        setSelectImage(e.target.src);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="lg:w-4/5 mx-auto flex flex-wrap relative">
              <img
                alt="ecommerce"
                className="lg:w-4/12 w-full h-[400px] object-contain object-top rounded"
                src={selectImage}
                width={800}
                height={100}
              />
              {!variant.availableQty < 1 ? (
                <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-yellow-600 px-2 py-1 rounded-md">
                  In Stock
                </div>
              ) : (
                <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-red-700 px-2 py-1 rounded-md">
                  Out of Stock
                </div>
              )}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
                <h2 className="text-sm title-font text-gray-500 tracking-widest font-robotoslab">
                  CODECOMMERCE
                </h2>
                <p className="font-firasans mt-4">
                  Parent Product:- {product.title}
                </p>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 font-robotoslab">
                  {variant.title} ({color}/{size})
                </h1>
                <div className="flex mb-4">
                  {/* <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                  fill="currentColor"
                  stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                    >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                    >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                    <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                      viewBox="0 0 24 24"
                      >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                      </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      </a>
                    </span> */}
                </div>
                <div className="leading-relaxed font-firasans">
                  {renderHTML(variant.desc)}
                </div>
                <div className="variantsListing my-3">
                  <p className="font-ubuntu text-xl my-2 text-black">
                    Variants:-{" "}
                  </p>
                  <div className="variantContainer flex gap-4 items-center">
                    {product.variants.map((variant, index) => {
                      return (
                        <div className="variant h-[100px] w-[80px]" key={index}>
                          <img
                            onClick={() => {
                              refreshVariant(variant);
                            }}
                            src={variant.mainImage}
                            alt="variant image helpers"
                            className={`w-full h-full transition-all duration-200 cursor-pointer hover:scale-110`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button
                      //   onClick={(e) => {
                      //     let p = product.variants.map((variant) => {
                      //       if (variant.color === color && size === size) {
                      //         console.log(variant);
                      //         return variant;
                      //       } else {
                      //         console.log(product);
                      //         return product;
                      //       }
                      //     });
                      //     console.log("p", p[0]);
                      //     refreshVariant(color, size, p[0]);
                      //   }}
                      className={`border-2  ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        color === "black"
                          ? "border-black bg-black"
                          : "border-gray-300"
                      } ${
                        color === "blue"
                          ? "border-black bg-blue-700"
                          : "border-gray-300"
                      } ${
                        color === "red"
                          ? "border-black bg-red-700"
                          : "border-gray-300 "
                      }  ${
                        color === "green"
                          ? "border-black bg-green-700"
                          : "border-gray-300 "
                      }  ${
                        color === "white"
                          ? "border-black bg-white"
                          : "border-gray-300 "
                      }`}
                    ></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select
                        value={size}
                        onChange={(e) => {
                          console.log(e.target.value);
                          refreshVariant(color, e.target.value);
                        }}
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300' focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                      >
                        {sizes.map((size, index) => {
                          return (
                            <option key={index} value={size}>
                              {size}
                            </option>
                          );
                        })}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-robotoslab font-medium text-xl lg:text-2xl text-gray-900">
                    NRs.{variant.price}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-3 sm:px-6 focus:outline-none hover:bg-pink-600 rounded font-firasans font-medium"
                    onClick={() => {
                      if (variant.availableQty > 0) {
                        addToCart(
                          slug,
                          1,
                          variant.price,
                          variant.title,
                          variant.size,
                          variant.color,
                          variant.mainImage
                        );
                        toast.success("Item added to cart!");
                      } else {
                        toast.warning("Sorry! Item is currently out of stock.");
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                  {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
                </div>
                <div className="buyNow flex justify-center items-center my-3 md:justify-start">
                  <button
                    onClick={() => {
                      if (variant.availableQty > 0) {
                        buyNow(
                          slug,
                          1,
                          variant.price,
                          variant.title,
                          variant.size,
                          variant.color,
                          variant.mainImage
                        );
                      } else {
                        toast.warning("Sorry! Item is currently out of stock.");
                      }
                    }}
                    className="flex my-5 text-white shadow-lg shadow-gray-800/50 bg-green-700 border-0 py-2 px-8 sm:px-10 focus:outline-none hover:bg-green-900 rounded font-firasans font-medium space-x-2 justify-center items-center"
                  >
                    <HiOutlineShoppingCart className="text-xl rotate-12 text-pink-100 font-bold" />
                    <span>Buy Now</span>
                  </button>
                </div>
                <div className="pin mt-6 flex space-x-2 text-base">
                  <input
                    type="number"
                    name="pincode"
                    className="border-2 border-gray-400 px-2 rounded-md outline-gray-400"
                    id="pincode"
                    placeholder="Check Your Pincode"
                    value={pin}
                    onChange={onChangePin}
                  />
                  <button
                    className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-3 sm:px-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300' hover:bg-pink-600 rounded font-firasans font-medium"
                    onClick={checkServiceability}
                  >
                    Check
                  </button>
                </div>
                {service === false && service !== null && (
                  <div className="text-red-700 font-firasans my-3 text-sm">
                    Sorry! We do not deliver to this pincode yet
                  </div>
                )}

                {service && service !== null && (
                  <div className="text-green-700 font-firasans my-3 text-sm">
                    Yay! This pincode is serviceable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let error;
  console.log(true);

  let variant = await Variants.findOne({ slug: context.query.slug });
  if (variant) {
    let product = await Product.findOne({ _id: variant.productsID }).populate({
      path: "variants",
      options: { lean: true },
    });

    let colors = [variant.color];
    let sizes = [variant.size];
    sizes = [...new Set(sizes)];
    colors = [...new Set(colors)];

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        variant: JSON.parse(JSON.stringify(variant)),
        colors: JSON.parse(JSON.stringify(colors)),
        sizes: JSON.parse(JSON.stringify(sizes)),
        error: "",
      }, // will be passed to the page component as props
    };
  }else{
    return {
      props: {
        error: 404
      }, // will be passed to the page component as props
    };
  }
}

export default Slug;
