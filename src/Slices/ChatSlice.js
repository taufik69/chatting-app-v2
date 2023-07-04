import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "taufik",
};

export const ActiveSlice = createSlice({
  name: "ActiveChat",
  initialState,
  reducers: {
    ActiveChatReducer: (state, action) => {
      state.value = action.payload;
    },
    GroupChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { ActiveChatReducer, GroupChat } = ActiveSlice.actions;

export default ActiveSlice.reducer;
