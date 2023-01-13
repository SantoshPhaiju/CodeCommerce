import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../helpers/baseUrl";

export const fetchOrders = createAsyncThunk("order/fetchOrders", async (data) =>{

    try {
        const response = await axios.post(
          `${baseUrl}/api/myorders`,
          { data }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
})


const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState, 
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state, action) =>{
            state.status = "loading";
        })
        .addCase(fetchOrders.fulfilled, (state, action) =>{
            state.status = "successed";
            // console.log(action.payload);
            if(action.payload.success === true){
                state.orders = action.payload.orders;
            }
        })
        .addCase(fetchOrders.rejected, (state, action) =>{
            state.status = "rejected";
            state.error = action.error.message;
            console.log(action.error.message);
        })
    }
})


export default orderSlice.reducer;

