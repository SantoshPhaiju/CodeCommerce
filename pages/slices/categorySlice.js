import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../helpers/baseUrl";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/fetchcategories`);
      // console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ categoryData, toast }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/addcategory`, {
        data: categoryData,
      });
      // console.log(response)
      if (response.data.success === true) {
        toast.success("Category added successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "successed";
        console.log(action.payload);
        if (action.payload.success === true) {
          state.categories = action.payload.category;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "rejected";
        console.log(error);
      })
      .addCase(addCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "successed";
        console.log(action.payload);
        if (action.payload.success === true) {
          state.categories.push(action.payload.category)
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "rejected";
        console.log(error);
      })
  },
});

export default categorySlice.reducer;
