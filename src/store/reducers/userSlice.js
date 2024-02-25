import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userProfile: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    
  },
});

// Actions générées automatiquement par createSlice
export const { setToken, setUserProfile } = userSlice.actions;

// Le reducer
export default userSlice.reducer;
