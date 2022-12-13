import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async() =>{
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/getproducts`
    );
    return response.data.products;
})

export const updateProduct = createAsyncThunk("products/updateProduct", async (data) =>{
  console.log("this is data", data);
  let updateData = [data];
  const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {data: updateData});
  return response.data;
})

const initialState = {
    products: [],
    status: "idle",
    updateStatus: "idle",
    error: null
}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.status = "loading";
            state.products = [];
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeded";
            const loadedProducts = Object.keys(action.payload).map((product) =>{
              return action.payload[product];
            })
            console.log(loadedProducts);
            state.products = loadedProducts;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            // console.log(action);
          })
          .addCase(updateProduct.pending, (state, action) => {
            state.updateStatus = "loading";
            
          })
          .addCase(updateProduct.fulfilled, (state, action) => {
            state.updateStatus = "succeded";
           const { _id } = action.payload.result;
           const products = state.products.filter(
             (product) => product._id !== _id
           );
           state.products = [action.payload.result, ...products];
          })
          .addCase(updateProduct.rejected, (state, action) => {
            state.updateStatus = "failed";
            state.error = action.error.message;
            // console.log(action);
          });
    }
})


export default productSlice.reducer;