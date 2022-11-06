import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductCard = (props) => {
  const {title, desc, price, img, color, slug, size, availableQty, category} = props.details;
  // console.log(props);
  return (
    <>
      <div className="xl:w-[24%] lg:w-[30%] md:w-[45%] pt-0 p-4 w-full border shadow-md rounded-md">
        <Link
          href={`/products/${slug}`}
          className="block relative rounded overflow-hidden"
        >
          <img
            alt="ecommerce"
            className="object-top object-contain w-full h-[40vh] block mx-auto"
            src={img}
            width={300}
            height={400}
          />
        </Link>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1 font-robotoslab"> NRs.{price}</p>
          <div className="footerContent block md:flex md:justify-between">
            <p className="mt-1 font-firasans my-2">{size}</p>
            <Link href={`/products/${slug}`}>
              <button className="py-1 px-8 bg-green-700 hover:bg-green-800 hover:shadow-lg hover:shadow-gray-500 text-white font-firasans rounded-sm shadow-md shadow-gray-400 flex justify-center items-center space-x-1">
                <HiOutlineShoppingCart className="text-lg -rotate-6" />
                <span>Buy Now</span>
              </button>
            </Link>
          </div>
          {/* रू */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
