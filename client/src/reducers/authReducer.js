import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "../thunks/signupUser";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
