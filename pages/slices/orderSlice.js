import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../helpers/baseUrl";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({token, dataLimit}) => {
    try {
      // console.log(token, dataLimit);
      const response = await axios.post(`${baseUrl}/api/myorders`, { data: {token, dataLimit} });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({id, toast}) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/deleteorder`, { data: id });
      if(response.data.success === true){
        toast.success("Order deleted successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderState, toast }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/updateOrder`, {
        data: { id, orderState },
      });
      if(response.data.success === true){
        toast.success("Your order has been successfully updated!")
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  orders: [],
  status: "idle",
  error: null,
  remaining: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "successed";
        // console.log(action.payload);
        if (action.payload.success === true) {
          if(action.payload.remaining === true){
            state.remaining = true;
            state.orders = action.payload.orders;
          }else{
            state.remaining = false;
            state.orders = action.payload.orders;
          }
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "successed";
        // console.log(action.payload);
        // if (action.payload.success === true) {
        //   state.orders = action.payload.orders;
        // }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "successed";
        console.log(action.payload);
        if (action.payload.success === true) {
          const orders = state.orders;
          let newOrders = orders.filter((order, index) =>{
            return order._id !== action.payload.order._id;
          })
          console.log("neworders", newOrders);
          state.orders = newOrders;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      })
  },
});

export default orderSlice.reducer;
