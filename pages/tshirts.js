import mongoose from "mongoose";
import Link from "next/link";
import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Product from "../models/Product";
import Variants from "../models/Variants";

const Tshirts = ({ tshirts }) => {
  // console.log(tshirts);
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Tshirts
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(tshirts).length === 0 && (
              <span>
                Sorry! All the tshirts are currently out of stock. New Stock
                coming soon!
              </span>
            )}

            {Object.keys(tshirts).map((product) => {
              // console.log(tshirts[product]);
              return (
                <div
                  className="xl:w-[24%] lg:w-[30%] md:w-[45%] pt-0 p-4 w-full border shadow-md rounded-md relative"
                  key={tshirts[product]._id}
                >
                  <Link
                    href={`/products/${tshirts[product].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <div className="image w-full h-[40vh] border">
                      <img
                        alt="ecommerce"
                        className="object-top w-full h-full block mx-auto"
                        src={tshirts[product].mainImage}
                        width={300}
                        height={400}
                      />
                    </div>
                  </Link>
                  {!tshirts[product].availableQty < 1 ? (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-yellow-600 px-2 py-1 rounded-md">
                      In Stock
                    </div>
                  ) : (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-red-600 px-2 py-1 rounded-md">
                      Out of Stock
                    </div>
                  )}
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {tshirts[product].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {tshirts[product].title}
                    </h2>
                    <p className="mt-1 font-robotoslab">
                      {" "}
                      Rs. {tshirts[product].price}
                    </p>
                    <div className="footerContent block md:flex md:justify-between">
                      <div className="mt-1 font-firasans my-2">
                        {tshirts[product].variants.map((variant, index) => {
                          return (
                            <span
                              key={index}
                              className="border border-gray-300 px-1 mx-1"
                            >
                              {variant.size}
                            </span>
                          );
                        })}

                        {tshirts[product].sizes.includes("Sm") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {tshirts[product].sizes.includes("Md") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {tshirts[product].sizes.includes("Lg") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {tshirts[product].sizes.includes("Xl") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {tshirts[product].sizes.includes("XXl") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 flex">
                      {tshirts[product].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].variants.map((variant, index) => {
                        return (
                          <div key={index} className="">
                            {variant.color.includes("blue") && (
                              <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("black") && (
                              <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("red") && (
                              <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("green") && (
                              <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("yellow") && (
                              <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("gray") && (
                              <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                            {variant.color.includes("white") && (
                              <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                            )}
                          </div>
                          // <span
                          //   key={index}
                          //   className="border border-gray-300 px-1 mx-1"
                          // >
                          //   {variant.color}
                          // </span>
                        );
                      })}
                      {tshirts[product].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("purple") && (
                        <button className="border-2 border-gray-300 ml-1 bg-purple-900 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {tshirts[product].color.includes("white") && (
                        <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>

                    {/* रू */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let tshirts;

  let products = await Product.find({ category: "Tshirts" }).populate({
    path: "variants",
    model: Variants,
    options: { lean: true },
  });


  return {
    props: { tshirts: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
