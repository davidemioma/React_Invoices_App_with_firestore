import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
  name: "theme",
  initialState: {
    filterValue: "all",
    isOpen: false,
  },
  reducers: {
    setFilterValue(state, action) {
      state.filterValue = action.payload;
    },

    toggleFilter(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default FilterSlice;
