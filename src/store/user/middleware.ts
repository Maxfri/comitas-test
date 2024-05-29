//dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";

//types
import { IUserItem } from "types/user.type";

//data
import { users } from "data/user";

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    const promise: Promise<IUserItem[]> = new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 500);
    });
    
    try {
      return await promise;
    } catch (error) {
      return rejectWithValue(error);
    };
  },
);