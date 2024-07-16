import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user information from action payload
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null; // Clear user information
      state.isLoggedIn = false;
    },
  },
});

export const authActions  = authSlice.actions; // Extract action creators

export const store = configureStore({
  reducer: authSlice.reducer,
});
