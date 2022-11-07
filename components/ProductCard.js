import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductCard = (props) => {
  const {title, desc, price, img, color, slug, size, availableQty, category} = props.details;
  // console.log(props);
  console.log(props.details);
  return (
    <>
      
    </>
  );
};

export default ProductCard;
