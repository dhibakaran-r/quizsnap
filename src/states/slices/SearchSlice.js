import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchData(state, action) {
      state.search = [...state.search, action.payload];
    },
    clearData(state, action) {
      state.search = "";
    },
  },
});

export const { searchData, clearData } = SearchSlice.actions;

export default SearchSlice.reducer;
