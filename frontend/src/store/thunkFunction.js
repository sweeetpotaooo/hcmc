import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/register`, userData);
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/login`, userData);
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const authUser = createAsyncThunk("/user/auth", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/users/auth");
    return response.data;
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue(err.response.data || err.message);
  }
});

export const logoutUser = createAsyncThunk(
  "/user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/logout`);
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
