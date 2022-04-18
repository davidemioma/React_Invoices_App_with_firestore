import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: {
    newFormOpen: false,
    editFormOpen: false,
  },
  reducers: {
    openNewForm(state) {
      state.newFormOpen = true;
    },

    closeNewForm(state) {
      state.newFormOpen = false;
    },

    openEditForm(state) {
      state.editFormOpen = true;
    },

    closeEditForm(state) {
      state.editFormOpen = false;
    },
  },
});

export default FormSlice;
