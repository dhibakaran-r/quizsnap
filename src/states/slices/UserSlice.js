import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  datas: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.datas = [...state, action.payload];
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
