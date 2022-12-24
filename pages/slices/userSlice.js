import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  user: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder){

    }
})


export default userSlice.reducer;

