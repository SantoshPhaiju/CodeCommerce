import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    // console.log("This is the useeffect from the _app.js");

    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (myCart) =>{
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) =>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }else{
      newCart[itemCode] = {qty: 1, price, name, size, variant};
    }
    // console.log(newCart)
    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const clearCart = () =>{
    setCart({});
    saveCart({});
    localStorage.clear();
  }

const removeFromCart = (itemCode, qty, price, name, size, variant) => {
  let newCart = cart;
  if (itemCode in cart) {
    newCart[itemCode].qty = newCart[itemCode].qty - qty;
  }
  if(newCart[itemCode]["qty"] <=0){
    delete newCart[itemCode]; 
  }
  setCart(newCart);
  saveCart(newCart);
};


  return (
    <>
      <Navbar addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <div className='min-h-[40vh] overflow-x-hidden'>
      <Component buyNow={buyNow} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
