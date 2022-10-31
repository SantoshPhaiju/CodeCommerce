import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";


const Navbar = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between shadow-lg">
      <Link href={"/"}>
        <div className="logo flex items-center text-lg font-mono text-blue-800 font-semibold ml-4">
          <Image
            src={"/roundedLogo.png"}
            className=""
            alt="Logo"
            width={60}
            height={60}
          />
          <h2
            className={`font-ubuntu font-bold text-xl md:2xl ml-2`}
          >
            CodeCommerce.Com
          </h2>
        </div>
      </Link>
      <nav className="flex items-center">
        <ul className="flex items-center justify-center space-x-5">
          <Link href={"/"} className={`link font-firasans`}>
            <li>Home</li>
          </Link>
          <Link href={"/tshirts"} className={`link font-firasans`}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/mugs"} className={`link font-firasans`}>
            <li>Mugs</li>
          </Link>
          <Link href={"/hoodies"} className={`link font-firasans`}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/books"} className={`link font-firasans`}>
            <li>Books</li>
          </Link>
        </ul>
      </nav>

      <div className="buttons flex items-center justify-center md:mr-7 text-xl md:text-3xl space-x-4 mb-3 md:mb-0">
        <Link href={"/"}>
          <AiOutlineShoppingCart />
        </Link>
        <Link href={"/"}>
          <MdOutlineAccountCircle />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
