import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  
  isAdmin: false,  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.email === "kundan@gmail.com"; 
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
