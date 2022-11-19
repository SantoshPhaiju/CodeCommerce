import { useRouter } from "next/router";
import React from "react";
import Order from "../models/Order";
import mongoose from "mongoose";

const OrderPage = ({ order, addToCart }) => {
  const router = useRouter();
  const orderedProducts = order.products;
  const { id } = router.query;
  // console.log(id, order);
  // console.log(Object.keys(orderedProducts));

  const handlePay = () =>{
    // console.log(order.products);
    
    Object.keys(order.products).map((item) => {
      // console.log(orderedProducts[item]["qty"]);
      addToCart(
        item,
        order.products[item]["qty"],
        order.products[item]?.price,
        order.products[item]?.name,
        order.products[item]?.size,
        order.products[item]?.variant
      );
    })
    router.push("/checkout");
  }
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest font-firasans">
                CODECOMMERCE.COM
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 font-roboto">
                Order Id: #{order?.orderId}
              </h1>
              <p className="leading-relaxed mb-4 text-green-600 font-robotoslab">
                Your order has been successfully placed. Your payment status is{" "}
                <span className="text-orange-600 font-semibold font-robotoslab text-lg">
                  '{order?.status}'
                </span>
                .
              </p>

              <div className="w-full mb-4 overflow-auto">
                <table className="table-auto w-full bg-slate-50 shadow-md rounded-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 tracking-wider font-medium text-gray-900 text-xs sm:text-lg max-2xl:text-xl bg-gray-200 rounded-tl rounded-bl font-robotoslab">
                        Items Description
                      </th>
                      <th className="px-4 py-3 tracking-wider font-medium text-gray-900 text-xs sm:text-lg max-2xl:text-xl bg-gray-200 font-robotoslab">
                        Quantity
                      </th>
                      <th className="px-4 py-3 tracking-wider font-medium text-gray-900 text-xs sm:text-lg max-2xl:text-xl bg-gray-200 font-robotoslab">
                        Price
                      </th>
                      <th className="px-4 py-3 tracking-wider font-medium text-gray-900 text-xs sm:text-lg max-2xl:text-xl bg-gray-200 font-robotoslab">
                        Amount(Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {Object.keys(orderedProducts).map((item) => {
                      return (
                        <tr key={item}>
                          <td className="px-4 py-3">
                            {orderedProducts[item]?.name}(
                            {orderedProducts[item]?.size}/
                            {orderedProducts[item]?.variant})
                          </td>
                          <td className="px-4 py-3">
                            {orderedProducts[item].qty}
                          </td>
                          <td className="px-4 py-3">
                            {orderedProducts[item]?.price}
                          </td>
                          <td className="px-4 py-3">
                            {Number(
                              orderedProducts[item]?.price *
                                orderedProducts[item]?.qty
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: NRs.{order.amount}
                </span>
                {order?.status === "Paid" ? (
                  <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                ) : (
                  <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={handlePay}>
                    Pay
                  </button>
                )}
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default OrderPage;
