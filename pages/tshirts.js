import mongoose from "mongoose";
import React from "react";
import ProductCard from "../components/ProductCard";
import Product from "../models/Product";

const Tshirts = ({products}) => {
  // console.log(products);
  return (
    <div>
      <h2 className="text-center mt-10 font-firasans text-3xl -mb-10 text-purple-900/75 font-semibold">
        Shop the Perfect Tshirts
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container py-24 sm:w-[50%] md:w-[90%] lg:w-[95%] w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {
              products.map((product) =>{
                return (
                <ProductCard
                key={product._id}
                  details={product}
                /> );
              })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({category: 'tshirt'});
  return {
    props: {products: JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  };
}

export default Tshirts;
