import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice";
import Spinner from "../../components/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Save } from "@mui/icons-material";
import UserActions from "./components/UserActions";

const AllProducts = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  // const [products, setProducts] = useState({});
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const sideBarRef = useRef();
  const dispatch = useDispatch();

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      editable: true,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 400,
      editable: true,
    },
    {
      field: "img",
      headerName: "Image",
      renderCell: (params) => <Avatar src={params.row.img} />,
      sortable: false,
      filterable: false,
      width: 100,
      editable: false,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      editable: true,
    },
    {
      field: "availableQty",
      headerName: "Availabe Qty",
      width: 100,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => <UserActions {...{ params, rowId, setRowId }} />,
    },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    let productRow = [];
    Object.keys(products).forEach((product) => {
      productRow.push(products[product]);
    });
    setRows(productRow);
  }, [products]);

  return (
    <>
      <style jsx global>{`
        footer,
        nav {
          display: none;
        }
      `}</style>

      <Sidebar
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        sideBarRef={sideBarRef}
      />
      <AdminNav
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        sideBarRef={sideBarRef}
      />
      <div
        className={`main pl-0 transition-all duration-300 mt-20 ${
          showSideBar === false ? "sm:pl-[90px]" : "sm:pl-[260px]"
        }`}
      >
        <div className="maindiv text-black pt-0 mt-10">
          <div className="heading flex flex-col sm:flex-row sm:justify-between mx-8 mr-20 sm:items-center">
            <h1 className="font-roboto text-2xl my-4 mx-4 text-blue-800">
              All Products
            </h1>
            <span className="text-lg font-robotoslab mt-0 sm:mt-4 ml-4 sm:ml-0">
              Total Products: {Object.keys(products).length}
            </span>
          </div>
          <div className="productContainer flex flex-wrap gap-6 my-10 justify-center mx-12">
            {/* {products &&
              status === "succeded" &&
              Object.keys(products).map((product, index) => {
                return (
                  <div className="product w-[300px] mt-4 border" key={index}>
                    <img
                      src={products[product].img}
                      width={300}
                      className="object-top object-contain w-full h-[40vh] block mx-auto"
                      height={400}
                      alt="This is the image here"
                    />
                    <hr />
                    <div className="ml-4 font-firasans mt-2">
                      {products[product].category}
                    </div>
                    <div className="content flex justify-center items-center h-[50px]">
                      <h2 className="text-xl font-firasans px-4 py-1 text-center">
                        {products[product].title}
                      </h2>
                    </div>
                    <h2 className="text-xl font-firasans px-4 py-1 text-left">
                      AvailableQty: {products[product].availableQty}
                    </h2>
                    <div className="buttons flex space-x-5 my-3 justify-center">
                      <button className="bg-pink-700 text-white py-2 px-8 rounded-sm shadow-lg cursor-pointer font-firasans hover:bg-pink-900 flex justify-center items-center space-x-2">
                        <BiEditAlt />
                        <span>Edit</span>
                      </button>
                      <button className="bg-orange-500 text-white py-2 px-8 rounded-sm shadow-lg cursor-pointer font-firasans hover:bg-orange-700 flex justify-center items-center space-x-2">
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })} */}

            {status === "loading" && <Spinner />}
            {status === "idle" && <Spinner />}

            <Box sx={{ height: 400, width: "100%" }}>
              {rows.length > 0 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  getRowId={(row) => row._id}
                  disableSelectionOnClick
                  onCellEditCommit={params => setRowId(params.id)}
                />
              )}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
