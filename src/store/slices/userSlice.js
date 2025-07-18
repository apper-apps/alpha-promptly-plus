import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "user-1",
    displayName: "Creative Writer",
    email: "writer@example.com",
    generationCount: 47,
    joinedAt: new Date().toISOString(),
    subscription: {
      plan: "free",
      generationsLeft: 53
    }
  },
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    incrementGenerationCount: (state) => {
      state.user.generationCount += 1;
      if (state.user.subscription.plan === "free") {
        state.user.subscription.generationsLeft -= 1;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setUser, 
  updateUser, 
  incrementGenerationCount,
  setLoading, 
  setError 
} = userSlice.actions;

export default userSlice.reducer;