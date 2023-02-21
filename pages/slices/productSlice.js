import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../helpers/baseUrl";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${baseUrl}/api/fetchallproducts`);

    // return data;
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ formdata, toast }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/addproducts`,
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
export const updateImages = createAsyncThunk(
  "products/updateImages",
  async ({ formdata, toast, id }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/updateproductimages?id=${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      if (response.data.success === true) {
        toast.success("Your product images are successfully updated.");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateProductDetails = createAsyncThunk(
  "products/updateproduct",
  async ({ productDetails, productDesc, toast, id }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/updateproduct?id=${id}`,
        { productDetails, productDesc },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(productDetails);
      // console.log(response.data);
      if (response.data.success === true) {
        toast.success("Your product details are successfully updated.");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, toast }) => {
    try {
      console.log(id);
      const response = await axios.delete(`${baseUrl}/api/deleteproduct`, {
        data: id,
      });
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
        console.log("products", action.payload.deletedVariants);
        const id = action.payload.deletedProduct._id;
        const products = state.products.filter((product) => product._id !== id);
        // console.log("loaded products", products);
        state.products = products;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      })
      .addCase(updateImages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateImages.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log("products", action.payload);
        const id = action.payload.updatedProduct._id;
        console.log("Id", id);
        state.products.map((product) => {
          if (product._id === id) {
            // console.log("img",action.payload.updatedProduct.img, "productimg", product.img);
            product.mainImage = action.payload.updatedProduct.mainImage;
            product.img = [...action.payload.updatedProduct.img];
          }
        });
        // const index = state.products.findIndex((product) => product._id === id);
        // state.products.splice(index, 1, action.payload.updatedProduct);
      })
      .addCase(updateImages.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      })
      .addCase(updateProductDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log("products", action.payload);
        const id = action.payload.updatedProduct._id;
        console.log("Id", id);
        state.products.map((product) => {
          if (product._id === id) {
            product.desc = action.payload.updatedProduct.desc;
          }
        });
        const index = state.products.findIndex((product) => product._id === id);
        state.products.splice(index, 1, action.payload.updatedProduct);
      })
      .addCase(updateProductDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "rejected";
        console.log(action.error.message);
      });
  },
});

export default productSlice.reducer;
