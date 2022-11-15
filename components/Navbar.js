import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { MdOutlineAccountCircle } from "react-icons/md";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  cartLength,
  loggedIn,
  logout,
}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const ref = useRef();

  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [page, setPage] = useState("/");

  useEffect(() => {
    // console.log(router.route);
    setPage(router.route);
  }, [router.route]);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between shadow-lg w-full bg-white sticky top-0 z-20">
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
              className={`font-firasans text-base 2xl:text-lg font-bold txl ml-2`}
            >
              CodeCommerce.Com
            </h2>
          </div>
        </Link>
        <nav className="flex items-center">
          <ul className="flex items-center justify-center space-x-5">
            <Link
              href={"/"}
              className={`link font-firasans ${
                page === "/" &&
                "text-blue-500 underline transition-all duration-200 transform translate-y-0.5 underline-offset-4 decoration-pink-600"
              }`}
            >
              <li>Home</li>
            </Link>
            <Link
              href={"/tshirts"}
              className={`link font-firasans ${
                page === "/tshirts" &&
                "text-blue-500 underline transition-all duration-200 transform translate-y-0.5 underline-offset-4 decoration-pink-600"
              }`}
            >
              <li>Tshirts</li>
            </Link>
            <Link
              href={"/mugs"}
              className={`link font-firasans ${
                page === "/mugs" &&
                "text-blue-500 underline transition-all duration-200 transform translate-y-0.5 underline-offset-4 decoration-pink-600"
              }`}
            >
              <li>Mugs</li>
            </Link>
            <Link
              href={"/hoodies"}
              className={`link font-firasans ${
                page === "/hoodies" &&
                "text-blue-500 underline transition-all duration-200 transform translate-y-0.5 underline-offset-4 decoration-pink-600"
              }`}
            >
              <li>Hoodies</li>
            </Link>
            <Link
              href={"/books"}
              className={`link font-firasans ${
                page === "/books" &&
                "text-blue-500 underline transition-all duration-200 transform translate-y-0.5 underline-offset-4 decoration-pink-600"
              }`}
            >
              <li>Books</li>
            </Link>
          </ul>
        </nav>

        <div className="buttons flex items-center justify-center md:mr-7 text-xl md:text-3xl space-x-4 mb-3 md:mb-0 relative">
          <div
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            {dropdown && (
              <div
                onMouseOver={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                className="absolute right-24 text-lg bg-pink-300 top-7 py-2 flex px-3 rounded-md font-firasans w-36"
              >
                <ul className="flex flex-col">
                  <Link
                    href={""}
                    className={
                      "hover:text-purple-700 hover:underline hover:underline-offset-2"
                    }
                  >
                    <li>My Account</li>
                  </Link>
                  <Link
                    href={""}
                    className={
                      "hover:text-purple-700 hover:underline hover:underline-offset-2"
                    }
                  >
                    <li>Orders</li>
                  </Link>
                  <Link
                    href={""}
                    className={
                      "hover:text-purple-700 hover:underline hover:underline-offset-2"
                    }
                  >
                    <li onClick={logout}>Logout</li>
                  </Link>
                </ul>
              </div>
            )}
            {loggedIn && (
              <>
                <MdAccountCircle className="cursor-pointer text-2xl text-pink-700" />
              </>
            )}
          </div>

          {!loggedIn && (
            <Link href={"/login"} className={"flex justify-center"}>
              <button className="btn text-base py-1 px-4 text-white bg-pink-600 rounded-md shadow-md font-firasans mt-0 shadow-gray-400">
                Login
              </button>
            </Link>
          )}
          {loggedIn && (
            <div className="text-lg font-firasans"> Welcome user </div>
          )}

          <AiOutlineShoppingCart
            className="cursor-pointer text-2xl"
            onClick={toggleCart}
           
          />
          <span
            className="absolute top-0 right-0 px-2 py-1 translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full text-xs text-white cursor-pointer"
            onClick={toggleCart}
          >
            {cartLength}
          </span>
        </div>

        <div
          className={`sidebar overflow-y-auto fixed top-0 right-0 bg-pink-200 px-6 py-10 transition-all transform ${
            Object.keys(cart).length !== 0
              ? "translate-x-0"
              : "translate-x-full"
          } duration-300 w-72 md:w-96 2xl:w-[25vw] h-[100vh] shadow-lg shadow-gray-500 z-20 font-medium`}
          ref={ref}
        >
          <h2 className="font-bold text-xl text-center mb-2 font-roboto text-blue-800 xl:text-2xl 2xl:text-3xl">
            Shopping Cart
          </h2>
          <span className="absolute top-4 right-6" onClick={toggleCart}>
            <AiFillCloseCircle className="text-2xl cursor-pointer text-pink-500" />
          </span>
          <ol className="list-decimal">
            {Object.keys(cart).length == 0 && (
              <div className="text-center my-5 font-light font-firasans">
                Your cart is Empty ! 😵‍💫
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-3 text-base 2xl:text-lg font-firasans font-medium text-black">
                    <div className="w-2/3">
                      {cart[k].name} ({cart[k].variant}/{cart[k].size})
                    </div>
                    <div className="w-1/3 flex items-center justify-center gap-5 text-lg">
                      <AiFillMinusCircle
                        onClick={() =>
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          )
                        }
                        className="text-xl text-pink-600 cursor-pointer"
                      />
                      <div>{cart[k].qty}</div>
                      <AiFillPlusCircle
                        onClick={() =>
                          addToCart(k, 1, 500, "Tshirt(XL, Blue)", "XL", "Blue")
                        }
                        className="text-xl text-pink-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="subtotal font-bold font-robotoslab mt-10 ml-2">
            SubTotal: Rs. {subTotal}
          </div>
          <div className="button flex flex-col lg:flex-row gap-4 mt-10 lg:gap-1 justify-center items-center my-2 lg:space-x-2">
            <Link href={"/checkout"}>
              <button className="font-firasans bg-pink-500 py-1 text-lg px-8 md:px-2 text-blue-100 font-medium text-center rounded-md shadow-lg shadow-gray-700/60 hover:bg-pink-700 flex items-center justify-center space-x-2">
                <BsFillBagCheckFill />
                <span>CheckOut</span>
              </button>
            </Link>
            <button
              className="font-firasans bg-red-600 py-1 text-lg px-8 md:px-2 text-blue-100 font-medium text-center rounded-md shadow-lg shadow-gray-700/60 hover:bg-red-800 flex items-center justify-center space-x-2"
              onClick={clearCart}
            >
              <AiFillDelete />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
