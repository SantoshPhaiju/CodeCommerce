import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { fetchProducts } from "../../slices/productSlice";
import Spinner from "../../components/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import UserActions from "./components/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";

const AllProducts = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [editable, setEditable] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  // const [products, setProducts] = useState({});
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const sideBarRef = useRef();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    desc: "",
    category: "",
    price: "",
    availabeQty: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditable(false);
    setOpen(false);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      editable: false,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 400,
      editable: false,
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
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      editable: false,
    },
    {
      field: "availableQty",
      headerName: "Availabe Qty",
      width: 100,
      editable: false,
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

  const capitalize = (str) =>{
    return str.toUpperCase();
  }

  const handleImage = (e) =>{
    console.log(e.target.files);
  }

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
          <Button
            variant="outlined"
            color={"primary"}
            sx={{ ml: 6 }}
            disabled={editable === true ? false : true}
            onClick={handleClickOpen}
          >
            Edit
          </Button>
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

            {rowData && (
              <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
              >
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Typography
                      variant="h4"
                      component={"div"}
                      sx={{ color: "blue" }}
                    >
                      {capitalize(rowData?.title)}
                    </Typography>
                  </DialogContentText>

                  <img src={rowData.img} width={"500px"} height={"500px"} className={"mx-auto"} alt="" />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title of the product"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={rowData.title}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="desc"
                    label="Description of the product"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={rowData.desc}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="category"
                    label="Category of the product"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={rowData.category}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={rowData.price}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="availabeQty"
                    label="AvailableQty"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={rowData.availableQty}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="size"
                    label="Size"
                    select
                    fullWidth
                    variant="outlined"
                    defaultValue={rowData.size}
                  >
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                    <MenuItem value={"XXL"}>XXL</MenuItem>
                  </TextField>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="color"
                    label="Color"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={rowData.color}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="slug"
                    label="Slug"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={rowData.slug}
                  />

                  <Button variant="contained" component="label">
                      Change the image
                    <input hidden accept="image/*" multiple type="file" onChange={handleImage} />
                  </Button>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            )}
            {status === "loading" && <Spinner />}
            {status === "idle" && <Spinner />}

            <Box sx={{ height: 400, width: "100%" }}>
              {rows.length > 0 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  // checkboxSelection
                  getRowId={(row) => row._id}
                  disableSelectionOnClick={true}
                  onRowClick={(item) => {
                    setRowData(item.row);
                    setEditable(true);
                  }}
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
