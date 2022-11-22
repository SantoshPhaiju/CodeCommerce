import React from "react";
import mongoose from "mongoose";
import Link from "next/link";
import Product from "../models/Product";

const Mugs = ({mugs}) => {
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Mugs for You Coffee
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(mugs).length === 0 && (
              <span>
                Sorry! All the mugs are currently out of stock. New Stock coming
                soon!
              </span>
            )}
            {Object.keys(mugs).map((product) => {
              // console.log(mugs[product].size);
              return (
                <div
                  className="xl:w-[24%] lg:w-[30%] md:w-[45%] pt-0 p-4 w-full border shadow-md rounded-md relative"
                  key={mugs[product]._id}
                >
                  <Link
                    href={`/products/${mugs[product].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="object-top object-contain w-full h-[40vh] block mx-auto"
                      src={mugs[product].img}
                      width={300}
                      height={400}
                    />
                  </Link>
                  {!mugs[product].availableQty < 1 ? (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-yellow-600 px-2 py-1 rounded-md">
                      In Stock
                    </div>
                  ) : (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-red-600 px-2 py-1 rounded-md">
                      Out of Stock
                    </div>
                  )}
                  <div className="mt-4 text-center md:text-left relative">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {mugs[product].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {mugs[product].title}
                    </h2>
                    <p className="mt-1 font-robotoslab">
                      {" "}
                      Rs. {mugs[product].price}
                    </p>
                    <div className="footerContent block md:flex md:justify-between">
                      <div className="mt-1 font-firasans my-2">
                        {mugs[product].size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {mugs[product].size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {mugs[product].size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {mugs[product].size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {mugs[product].size.includes("XXL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-1">
                      {mugs[product].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("purple") && (
                        <button className="border-2 border-gray-300 ml-1 bg-purple-900 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {mugs[product].color.includes("white") && (
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

  let products = await Product.find({ category: "mugs" });

  let mugs = {};
  for (let item of products) {
    if (item.title in mugs) {
      if (item.availableQty > 0) {
        mugs[item.title].availableQty += item.availableQty;
      }
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }
      if (
        !mugs[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        mugs[item.title].size.push(item.size);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { mugs: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
  };
}

export default Mugs;
