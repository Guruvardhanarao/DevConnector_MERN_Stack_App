import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    autenticate: (state) => {
      state.isAuthenticated = true;
    },
    register: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { autenticate, register } = authSlice.actions;
export default authSlice.reducer;
