import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/getvariants`
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({formdata, toast}) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Your product is successfully published.");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({id, toast}) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/deleteproduct`,
        { data: id }
      );
      // console.log(response.data, id);
      toast.success("Product deleted successfully!");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log("products" , state.products);
        const id = action.payload.deletedProduct._id;
        const products = state.products.filter((product) => product._id !== id);
        console.log("loaded products", products);
        state.products = products;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      });
  },
});

export default productSlice.reducer;
