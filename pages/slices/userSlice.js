import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../helpers/baseUrl";

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ id, admin }) => {
    console.log(id, admin);
    const data = { id, admin };

    try {
      const response = await axios.post(
        `${baseUrl}/api/updateuser`,
        { data },
        {
          headers: {
            admintoken: localStorage.getItem("admin-token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/fetchallusers`,
      {
        headers: {
          admintoken: localStorage.getItem("admin-token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // console.log(action.payload);
        if (action.payload.success === true) {
          state.users = action.payload.users;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(editUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        const admin = action.payload.updatedUser.admin;
        if (action.payload.success === true) {
          state.users.map((user) => {
            if (user._id === action.payload.updatedUser._id) {
              user.admin = admin;
            }
          });
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export default userSlice.reducer;
