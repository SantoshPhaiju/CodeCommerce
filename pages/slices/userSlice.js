import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () =>{
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/fetchallusers`, {
      headers: {
        "admintoken": localStorage.getItem("admin-token")
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
  }
})


const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder){
      builder.addCase(fetchUsers.pending, (state, action) =>{
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) =>{
        state.status = "fulfilled";
        // console.log(action.payload);
        if(action.payload.success === true){
          state.users = action.payload.users;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) =>{
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      })
    }
})


export default userSlice.reducer;

