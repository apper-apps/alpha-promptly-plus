import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generations: [],
  currentGeneration: null,
  isGenerating: false,
  error: null
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    setGenerations: (state, action) => {
      state.generations = action.payload;
    },
    addGeneration: (state, action) => {
      state.generations.unshift(action.payload);
    },
    updateGeneration: (state, action) => {
      const index = state.generations.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.generations[index] = { ...state.generations[index], ...action.payload };
      }
    },
    deleteGeneration: (state, action) => {
      state.generations = state.generations.filter(g => g.id !== action.payload);
    },
    setCurrentGeneration: (state, action) => {
      state.currentGeneration = action.payload;
    },
    toggleFavorite: (state, action) => {
      const generation = state.generations.find(g => g.id === action.payload);
      if (generation) {
        generation.isFavorite = !generation.isFavorite;
      }
    },
    setGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setGenerations,
  addGeneration,
  updateGeneration,
  deleteGeneration,
  setCurrentGeneration,
  toggleFavorite,
  setGenerating,
  setError
} = generationSlice.actions;

export default generationSlice.reducer;