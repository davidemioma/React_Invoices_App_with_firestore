import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark_mode",
  },
  reducers: {
    toggleTheme(state) {
      if (state.theme === "dark_mode") {
        state.theme = "light_mode";
      } else {
        state.theme = "dark_mode";
      }
    },
  },
});

export default ThemeSlice;
