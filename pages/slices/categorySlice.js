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
        console.log(action.payload)
        if (action.payload.success === true) {
          state.categories = action.payload.category;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "rejected";
        console.log(error);
      });
  },
});


export default categorySlice.reducer;
