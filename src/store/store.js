import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./theme-slice";
import UserSlice from "./user-slice";
import FilterSlice from "./filter-slice";
import FormSlice from "./form-slice";

const store = configureStore({
  reducer: {
    theme: ThemeSlice.reducer,
    user: UserSlice.reducer,
    filters: FilterSlice.reducer,
    form: FormSlice.reducer,
  },
});

export const { toggleTheme } = ThemeSlice.actions;

export const { login, logout } = UserSlice.actions;

export const { setFilterValue, toggleFilter } = FilterSlice.actions;

export const { openNewForm, closeNewForm, openEditForm, closeEditForm } =
  FormSlice.actions;

export default store;
