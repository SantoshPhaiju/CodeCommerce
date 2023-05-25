import mongoose from "mongoose";
import React from "react";
import Product from "../../models/Product";
import Variants from "../../models/Variants";

const Slug = ({ products }) => {
  console.log("products", products)
  return <div>This is the dynamic page here.</div>;
};
// TODO: Displaying the products as per the category request in the same page.

export async function getServerSideProps(context) {
  // console.log("context", context.query);
  let catName = context.query.slug;
  console.log("categoryname", catName);
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let items = await Product.find({ category: catName }).populate({
    path: "variants",
    model: Variants,
    options: { lean: true },
  });
  console.log("items", items)

  return {
    props: { products: JSON.parse(JSON.stringify(items)) }, // will be passed to the page component as props
  };
}

export default Slug;
