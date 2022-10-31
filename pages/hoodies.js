import React from 'react'
import ProductCard from '../components/ProductCard';

const Hoodies = () => {
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Hoodies for Winter Coding
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
            <ProductCard image="/hoodie.webp" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hoodies
