import React from "react";

const Order = () => {
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
                Order Id: #8983211
              </h1>
              <p className="leading-relaxed mb-4 text-green-600 font-robotoslab">
                Your order has been successfully placed
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
                        Amount(Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="px-4 py-3">Coding Tshirt (Xl, Blue)</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">144</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Coding Tshirt (Xl, Blue)</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">144</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Coding Tshirt (Xl, Blue)</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">144</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: NRs.1543.00
                </span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track Order
                </button>
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

export default Order;
