import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Dancing_Script,
  Fira_Sans,
  Kanit,
  Roboto,
  Ubuntu,
} from "@next/font/google";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";

const firasans = Fira_Sans({
  weight: "400",
});
const dancingscript = Dancing_Script();

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
            className={`${dancingscript.className} font-bold text-2xl md:3xl ml-2`}
          >
            CodeCommerce.Com
          </h2>
        </div>
      </Link>
      <nav className="flex items-center">
        <ul className="flex items-center justify-center space-x-5">
          <Link href={"/"} className={`link ${firasans.className}`}>
            <li>Home</li>
          </Link>
          <Link href={"/tshirts"} className={`link ${firasans.className}`}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/mugs"} className={`link ${firasans.className}`}>
            <li>Mugs</li>
          </Link>
          <Link href={"/hoodies"} className={`link ${firasans.className}`}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/books"} className={`link ${firasans.className}`}>
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
