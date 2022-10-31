import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = (props) => {
  return (
    <>
      <div className="xl:w-[24%] lg:w-[30%] md:w-[45%] pt-0 p-4 w-full border shadow-md rounded-md">
        <Link
          href={"/products/tshirts"}
          className="block relative rounded overflow-hidden"
        >
          <Image
            alt="ecommerce"
            className="object-top object-contain w-full h-[40vh] block mx-auto"
            src={props.image}
            width={300}
            height={400}
          />
        </Link>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            The Catalyzer
          </h2>
          <p className="mt-1 font-robotoslab"> NRs.500.00</p>
          <div className="footerContent block md:flex md:justify-between">
          <p className="mt-1 font-firasans my-2">S, M, L, XL, XXL</p>
          <Link href={"/products/tshirt"}>
          <button className="py-1 px-8 bg-green-800 hover:bg-green-700 hover:shadow-lg hover:shadow-gray-500 text-white font-firasans rounded-sm shadow-md shadow-gray-400">
            Buy Now
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
