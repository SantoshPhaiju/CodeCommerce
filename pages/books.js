import React from 'react'
import ProductCard from '../components/ProductCard';

const Books = () => {
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Books for coding
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <ProductCard image="/book.jpg" />
            <ProductCard image="/book2.webp" />
            <ProductCard image="/book3.webp" />
            <ProductCard image="/book4.webp" />
            <ProductCard image="/book5.webp" />
            <ProductCard image="/book6.webp" />
            <ProductCard image="/book7.webp" />
            <ProductCard image="/book8.webp" />
            <ProductCard image="/book7.webp" />
            <ProductCard image="/book5.webp" />
            <ProductCard image="/book8.webp" />
            <ProductCard image="/book6.webp" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Books
