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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, toast }) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/deletecategory`, {
        data: id,
      });
      // console.log(response)
      if (response.data.success === true) {
        toast.success("Category deleted successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData, toast }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/updatecategory`, {
        data: {id, cName: categoryData.cName, cDesc: categoryData.cDesc},
      });
      // console.log(response)
      if (response.data.success === true) {
        toast.success("Category updated successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
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
      console.log(response.data);
      if (response.data.success === true) {
        toast.success("Category added successfully");
      }
      return response.data;
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.error);
      return error.response.data;
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
        console.log("action.payload", action.payload);
        if (action.payload.success === true) {
          state.categories.push(action.payload.category);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = error.response.data.error;
        console.log("error", error);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "successed";
        console.log("action.payload", action.payload);

        if (action.payload.success === true) {
          let newCategories = state.categories.filter((category) => {

            return category._id !== action.payload.category._id;
          });
          state.categories = newCategories;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = error.response.data.error;
        console.log("error", error);
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "successed";
        // console.log("action.payload", action.payload);

        if (action.payload.success === true) {
          state.categories.map((category) =>{
            if(category._id === action.payload.updatedCategory._id){
              category.name = action.payload.updatedCategory.name
              category.description = action.payload.updatedCategory.description
            }
          })
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = error.response.data.error;
        console.log("error", error);
      })
  },
});

export default categorySlice.reducer;
