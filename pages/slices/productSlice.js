import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/getproducts`
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk("products/addProduct", async(data) =>{
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,
          data,
          {
            headers: {
                "Content-Type": "multipart/form-data"
            }
          }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeded";
        const products = action.payload.products;
        const loadedProducts = Object.keys(products).map((product) => {
        //   console.log("product = " , products[product]);
          return products[product];
        });
        state.products = loadedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      })
      .addCase(addProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log(action.payload);
        // const products = action.payload.products;
        // const loadedProducts = Object.keys(products).map((product) => {
        // //   console.log("product = " , products[product]);
        //   return products[product];
        // });
        // state.products = loadedProducts;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      })
  },
});

export default productSlice.reducer;
