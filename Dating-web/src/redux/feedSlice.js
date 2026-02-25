import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
  name : "feed",
  initialState : null,
  reducers : {
    addFeed : (state, action) => {
      return action.payload;
    },
    removeFeed : (state, action) => {
      const feedFilter = state.filter((user) => user._id !== action.payload)
      return feedFilter;
    }
  }
});

export const {addFeed, removeFeed} = feedSlice.actions;

export default feedSlice.reducer;