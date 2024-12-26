import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {},
  reducers: {
    setError: (state, action) => action.payload,
    clearError: () => {},
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
