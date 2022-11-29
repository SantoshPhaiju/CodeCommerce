import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSideBar from "../components/AccountSideBar";
import { AiOutlinePlus } from "react-icons/ai";

const AddressBook = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const [province, setProvince] = useState("Please choose your province");
  const [city, setCity] = useState("Please choose your city or municipality");
  const [disableCity, setDisableCity] = useState(true);
  const [label, setLabel] = useState("");
  const [shippingaddress, setShippingAddress] = useState(false);
  const [billingaddress, setBillingAddress] = useState(false);
  const [addressDetail, setAddressDetail] = useState({
    name: "",
    address: "",
    landmark: "",
    mobile: "",
    area: "",
  });
  const [userAddress, setUserAddress] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (province === "Please choose your province") {
      setDisableCity(true);
    } else {
      setDisableCity(false);
    }
  });

  const handleChange = (e) => {
    if (e.target.name === "province") {
      setProvince(e.target.value);
    }

    if (e.target.name === "city") {
      setCity(e.target.value);
    }

    if (e.target.name === "label") {
      setLabel(e.target.value);
    }

    setAddressDetail({ ...addressDetail, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const fetchAddress = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchaddress`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    // console.log("app", response.data);
    if (response.data.success === true) {
      setUserAddress(response.data.useraddress);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [openModal]);

  const checkboxChange = (e) => {
    console.log(e.target.name, e.target.checked);
    if (e.target.name === "shippingaddress") {
      setShippingAddress(e.target.checked);
    }
    if (e.target.name === "billingaddress") {
      setBillingAddress(e.target.checked);
    }
  };
  // console.log(shippingaddress, billingaddress);
  const addressUserData = {
    ...addressDetail,
    province,
    city,
    label,
    shippingaddress,
    billingaddress,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addressUserData);
    setOpenModal(false);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/addaddress`,
      { data: addressUserData },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      console.log(response.data);
    }
  };
  return (
    <div className="w-[100vw] bg-slate-100 min-h-[90vh] ">
      <div className="container mx-auto 2xl:w-[80vw] lg:w-[80vw] w-[95vw]">
        <div className="innerDiv flex flex-row py-6">
          <AccountSideBar />
          <div className="main w-[75%]">
            <div className="header flex justify-between">
              <h1 className="font-sans text-lg lg:text-2xl text-pink-900">
                Address Book
              </h1>
              <h1
                className="font-firasans text-base lg:text-lg text-pink-900 flex space-x-2 justify-center items-center cursor-pointer hover:text-blue-500"
                onClick={() => setOpenModal(true)}
              >
                <AiOutlinePlus />
                <span>Add New Address</span>
              </h1>
            </div>
            <div className="bg-white w-full h-auto min-h-[50vh] px-10 py-6 shadow-md my-4">
              <div className="addressContainer grid grid-cols-2 gap-6">
                {userAddress.length !== 0 &&
                  userAddress.map((address, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="address border border-gray-400 rounded-sm h-[180px] transition-all duration-500 hover:shadow-md hover:shadow-gray-700/50 cursor-pointer px-4
                         py-5"
                        >
                          <div className="grid grid-cols-12">
                            <div className="left col-span-10">
                              <p className="text-sm text-black font-robotoslab mb-2">
                                {address?.name}
                              </p>
                              <p className="text-sm text-black font-robotoslab mb-2">
                                (+977) {address?.mobile}
                              </p>
                              <p className="text-sm text-black font-robotoslab mb-2">
                                {address?.province}, {address?.city},{" "}
                                {address?.area}, {address?.address},{" "}
                                {address?.landmark}
                              </p>
                              <div className="labels flex flex-wrap gap-3">
                                <span className=" text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                  {address?.label}
                                </span>
                                  {address?.shippingAddress === true &&
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                    Defalut shipping address
                                </span>}
                                  {address?.billingAddress === true &&
                                <span className="item text-xs bg-gray-200 text-center px-2 py-0.5 rounded-sm">
                                  Defalut billing address
                                </span>}
                              </div>
                            </div>
                            <div className="right col-span-2">
                              <p className="text-blue-500 font-sans cursor-pointer text-sm text-right">
                                EDIT
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {userAddress.length === 0 && (
                <div
                  className="text-center my-auto mx-auto font-firasans text-3xl flex items-center justify-center gap-2 hover:text-blue-700 cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  {" "}
                  <AiOutlinePlus /> Add New Address{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <>
          <div className="overlay absolute top-0 left-0 h-[100vh] w-full bg-black opacity-30"></div>
          <div className="flex justify-center items-center">
            <div className="modal min-h-[200px] overflow-y-auto fixed top-[80px] bg-white h-auto w-[800px] rounded-md z-50 shadow-lg shadow-slate-900/50">
              <div className="modalHeader px-8 py-6 font-firasans flex justify-between">
                <span>Add New Delivery Address</span>
                <button
                  className="px-4 text-xl"
                  onClick={() => setOpenModal(false)}
                >
                  ❌
                </button>
              </div>
              <hr />
              <div className="modalBody bg-[#fafafa] h-auto w-full mb-2 px-8 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="left col-span-1">
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Full Name</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="Input full name"
                          type="text"
                          name="name"
                          id="name"
                          value={addressDetail.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="Input mobile number"
                          type="number"
                          name="mobile"
                          id="mobile"
                          value={addressDetail.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Province</label>
                        <select
                          name="province"
                          id="province"
                          className="cursor-pointer px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          value={province}
                          onChange={handleChange}
                          required={true}
                        >
                          <option value="Please choose your province" disabled>
                            Please choose your province
                          </option>
                          <option value="Province 1">Province 1</option>
                          <option value="Madhesh Province">
                            Madhesh Province
                          </option>
                          <option value="Bagmati Province">
                            Bagmati Province
                          </option>
                          <option value="Gandaki Province">
                            Gandaki Province
                          </option>
                          <option value="Lumbini Province">
                            Lumbini Province
                          </option>
                          <option value="Karnali Province">
                            Karnali Province
                          </option>
                          <option value="Sudur Pashchim Province">
                            Sudur Pashchim Province
                          </option>
                        </select>
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">City</label>
                        <select
                          name="city"
                          id="city"
                          onChange={handleChange}
                          className={`cursor-pointer ${
                            disableCity && "cursor-not-allowed"
                          } px-4 py-2 border border-gray-300 rounded-sm w-full mt-2`}
                          value={city}
                          disabled={disableCity}
                          required
                        >
                          <option
                            value="Please choose your city or municipality"
                            disabled
                          >
                            Please choose your city or municipality
                          </option>
                          {province === "Bagmati Province" && (
                            <>
                              <option value="Kathmandu">Kathmandu</option>
                              <option value="Bhaktapur">Bhaktapur</option>
                              <option value="Lalitpur">Lalitpur</option>
                            </>
                          )}
                          {province === "Province 1" && (
                            <>
                              <option value="Biratnagar">Biratnagar</option>
                              <option value="Dharan">Dharan</option>
                              <option value="Illam">Illam</option>
                            </>
                          )}
                          {province === "Madhesh Province" && (
                            <>
                              <option value="Birgunj">Birgunj</option>
                              <option value="Janakpur">Janakpur</option>
                              <option value="Kalaiya">Kalaiya</option>
                            </>
                          )}
                          {province === "Gandaki Province" && (
                            <>
                              <option value="Pokhara">Pokhara</option>
                              <option value="Bandipur">Bandipur</option>
                              <option value="Manang">Manang</option>
                            </>
                          )}
                          {province === "Lumbini Province" && (
                            <>
                              <option value="Kapilbastu">Kapilbastu</option>
                              <option value="Ghorahi">Ghorahi</option>
                              <option value="Butwal">Butwal</option>
                            </>
                          )}
                          {province === "Karnali Province" && (
                            <>
                              <option value="Birendranagar">
                                Birendranagar
                              </option>
                              <option value="Tulsipur">Tulsipur</option>
                              <option value="Musikot">Musikot</option>
                            </>
                          )}
                          {province === "Sudur Pashchim Province" && (
                            <>
                              <option value="Dhangadhi">Dhangadhi</option>
                              <option value="Bhimdatta">Bhimdatta</option>
                              <option value="Bedkot">Bedkot</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="name">Area</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="E.g. Chabahil Chowk"
                          type="text"
                          name="area"
                          id="area"
                          value={addressDetail.area}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="right col-span-1">
                      <div className="inputGroup mb-2">
                        <label htmlFor="address">Address</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="House no. / building / street / area"
                          type="text"
                          name="address"
                          id="address"
                          value={addressDetail.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2">
                        <label htmlFor="landmark">Landmark</label>
                        <input
                          className="px-4 py-2 border border-gray-300 rounded-sm w-full mt-2"
                          placeholder="E.g. next to airport"
                          type="text"
                          name="landmark"
                          id="landmark"
                          value={addressDetail.landmark}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="inputGroup mb-2 ">
                        <label htmlFor="" className="mb-2">
                          Select a label for effective delivery
                        </label>
                        <ul className="grid gap-6 w-full md:grid-cols-2 mt-2">
                          <li>
                            <input
                              type="radio"
                              id="home"
                              name="label"
                              value="Home"
                              onChange={handleChange}
                              className="hidden peer"
                              required
                            />
                            <label
                              htmlFor="home"
                              className="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              <div className="block">
                                <span>Home</span>
                              </div>
                            </label>
                          </li>

                          <li>
                            <input
                              type="radio"
                              id="office"
                              name="label"
                              value="Office"
                              onChange={handleChange}
                              className="hidden peer"
                              required
                            />
                            <label
                              htmlFor="office"
                              className="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              <div className="block">
                                <span>Office</span>
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>

                      <div className="inputGroup mb-2">
                        <label htmlFor="">Default Addresses</label>
                        <div className="border px-4 py-2">
                          <div className="flex items-center mt-2">
                            <input
                              className="mr-2"
                              placeholder=""
                              type="checkbox"
                              name="shippingaddress"
                              id="shippingaddress"
                              onClick={checkboxChange}
                            />
                            <label htmlFor="shippingaddress">
                              Default Shipping Address
                            </label>
                          </div>
                          <div className="flex items-center mt-2">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="billingaddress"
                              id="billingaddress"
                              onClick={checkboxChange}
                            />
                            <label htmlFor="billingaddress">
                              Default Billing Address
                            </label>
                          </div>

                          <p className="text-sm mt-2">
                            Your existing default address setting will be
                            replaced if you make some changes here.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button">
                    <button
                      type="submit"
                      className="px-16 mt-10 float-right mb-4 py-2 bg-red-500 text-white text-lg rounded-md"
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default AddressBook;
