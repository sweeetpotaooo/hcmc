import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: {
    token: {
      atk: '',
    },
  },
  status: 'idle',
};

export const logOutUser = createAsyncThunk(
  'user/logOut',
  async (payload) => {
    const response = await axios.post('/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Add reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = {
          token: {
            atk: '',
          },
        };
      })
      .addCase(logOutUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
