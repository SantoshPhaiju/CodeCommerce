import mongoose from "mongoose";
import Link from "next/link";
import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import ProductCard from "../components/ProductCard";
import Product from "../models/Product";

const Tshirts = ({ tshirts }) => {
  console.log(tshirts);
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
                Sorry! All the tshirts are currently out of stock. New Stock coming
                soon!
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
                    <img
                      alt="ecommerce"
                      className="object-top object-contain w-full h-[40vh] block mx-auto"
                      src={tshirts[product].img}
                      width={300}
                      height={400}
                    />
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
                        {tshirts[product].size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {tshirts[product].size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {tshirts[product].size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {tshirts[product].size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {tshirts[product].size.includes("XXL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-1">
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
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "tshirt" });

  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (item.availableQty > 0) {
        tshirts[item.title].availableQty += item.availableQty;
      }
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        // tshirts[item.title].color.push(item.color);
        tshirts[item.title].color += item.color

        // console.log(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size += item.size;
        // tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { tshirts: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
