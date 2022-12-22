import React from "react";
import mongoose from "mongoose";
import Link from "next/link";
import Product from "../models/Product";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Books = ({ books, buyNow }) => {
  console.log(books);
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Books for coding
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(books).length === 0 && (
              <span>
                Sorry! All the books are currently out of stock. New Stock
                coming soon!
              </span>
            )}
            {Object.keys(books).map((product) => {
              // console.log(books[product].size);
              return (
                <div
                  className="xl:w-[24%] lg:w-[30%] md:w-[45%] pt-0 p-4 w-full border shadow-md rounded-md relative"
                  key={books[product]._id}
                >
                  <Link
                    href={`/books/${books[product].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="object-top object-contain w-full h-[40vh] block mx-auto"
                      src={books[product].img[0]}
                      width={300}
                      height={400}
                    />
                  </Link>
                  {!books[product].availableQty < 1 ? (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-yellow-600 px-2 py-1 rounded-md">
                      In Stock
                    </div>
                  ) : (
                    <div className="text-center text-white font-firasans mt-4 text-xl absolute top-0 -left-2 bg-red-700 px-2 py-1 rounded-md">
                      Out of Stock
                    </div>
                  )}
                  <div className="mt-4 text-center md:text-left relative">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {books[product].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {books[product].title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="mt-1 font-robotoslab">
                        {" "}
                        Rs. {books[product].price}
                      </p>

                      {!books[product].availableQty < 1 && (
                        <button
                          onClick={() =>{
                            // console.log(books[product])
                            buyNow(
                              books[product].slug,
                              1,
                              books[product].price,
                              books[product].title,
                              books[product]?.size,
                              books[product]?.variant,
                              books[product]?.img
                            )
                          }
                          }
                          className="flex my-5 text-white shadow-lg shadow-gray-800/50 bg-green-700 border-0 py-2 px-8 sm:px-10 focus:outline-none hover:bg-green-900 rounded font-firasans font-medium space-x-2 justify-center items-center"
                        >
                          <HiOutlineShoppingCart className="text-xl rotate-12 text-pink-100 font-bold" />
                          <span>Buy Now</span>
                        </button>
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

  let products = await Product.find({ category: "books" });

  let books = {};
  for (let item of products) {
    if (item.title in books) {
      if (item.availableQty > 0) {
        books[item.title].availableQty += item.availableQty;
      }
    } else {
      books[item.title] = JSON.parse(JSON.stringify(item));
    }
  }
  //   if (
  //     !books[item.title].color.includes(item.color) &&
  //     item.availableQty > 0
  //   ) {
  //     books[item.title].color.push(item.color);
  //   }
  //   if (!books[item.title].size.includes(item.size) && item.availableQty > 0) {
  //     books[item.title].size.push(item.size);
  //   }
  // } else {
  //   books[item.title] = JSON.parse(JSON.stringify(item));
  //   if (item.availableQty > 0) {
  //     books[item.title].color = [item.color];
  //     books[item.title].size = [item.size];
  //   }
  return {
    props: { books: JSON.parse(JSON.stringify(books)) }, // will be passed to the page component as props
  };
}

export default Books;
