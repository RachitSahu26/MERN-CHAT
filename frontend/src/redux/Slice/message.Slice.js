import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messagesData",
  initialState: {
    message: null,
  },
  reducers: {
    storedMessageData(state, action) {
      state.message = action.payload;
    },
    clearMessageData(state) {
      state.message = null;
    }
  }
});

export const { storedMessageData, clearMessageData } = messageSlice.actions;
export default messageSlice.reducer;
