import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import "../styles/globals.css";
import { store } from "/store";
import { Provider } from "react-redux";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const fetchuser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchuserdata`,
      { data: token }
    );
    // console.log("app",response.data);
    if (response.data) {
      // setUser(response.data.user);
      setUserData(response.data.user);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    if (localStorage.getItem("token")) {
      fetchuser();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [router.route]);

  useEffect(() => {
    // console.log("This is the useeffect from the _app.js");

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
    setLoggedIn(false);
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty, price, name, size, variant, img };
    }
    // console.log(newCart)
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    localStorage.removeItem("cart");
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const cartLength = Object.keys(cart).length || 0;

  return (
    <>
      <Provider store={store}>
        <LoadingBar
          // color="#000"
          color="#ec4899"
          progress={progress}
          waitingTime={400}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar
          addToCart={addToCart}
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          cartLength={cartLength}
          loggedIn={loggedIn}
          logout={logout}
          userData={userData}
        />
        <div className="min-h-[40vh] overflow-x-hidden">
          <Component
            buyNow={buyNow}
            addToCart={addToCart}
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            cartLength={cartLength}
            subTotal={subTotal}
            loggedIn={loggedIn}
            userData={userData}
            {...pageProps}
          />

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
