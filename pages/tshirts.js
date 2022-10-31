import React from "react";
import ProductCard from "../components/ProductCard";

const Tshirts = () => {
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Tshirts
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <ProductCard image="/tshirt.png" />
            <ProductCard image="/tshirt2.jpg" />
            <ProductCard image="/tshirt3.jpg" />
            <ProductCard image="/tshirt4.jpg" />
            <ProductCard image="/tshirt5.jpg" />
            <ProductCard image="/tshirt6.jpg" />
            <ProductCard image="/tshirt.png" />
            <ProductCard image="/tshirt.png" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tshirts;
