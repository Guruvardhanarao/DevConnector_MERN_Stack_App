import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError, clearError } from "../reducers/errorReducer";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/register", userData);
      clearError();
      return response.data;
    } catch (error) {
      // Check if the error is an Axios error and handle accordingly
      if (error.response) {
        dispatch(setError(error.response.data || "Signup failed"));
        // Server responded with a status other than 200 range
        return rejectWithValue(error.response.data || "Signup failed");
      } else if (error.request) {
        dispatch(setError("No response from server. Please try again."));
        // Request was made but no response received
        return rejectWithValue("No response from server. Please try again.");
      } else {
        dispatch(setError(error.message));
        // Something else happened while setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);
