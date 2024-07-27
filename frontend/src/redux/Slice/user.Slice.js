import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authdata');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (e) {
    console.warn("Failed to load authdata from local storage", e);
    return null;
  }
};

// Load initial state from local storage or initialize it as null
const initialState = {
  authdata: loadStateFromLocalStorage(),
  otherUserData: null,
  selectedUser: null,
  onlineUser: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuthData(state, action) {
      state.authdata = action.payload;
      // Save authdata to local storage
      try {
        const serializedState = JSON.stringify(state.authdata);
        localStorage.setItem('authdata', serializedState);
      } catch (e) {
        console.warn("Failed to save authdata to local storage", e);
      }
    },
    storeOtherUserData(state, action) {
      state.otherUserData = action.payload.data;
    },
    storeSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state, action) {
      state.selectedUser = null;
    },
    storeOnlineUser(state, action) {
      state.onlineUser = action.payload;
    },
    clearUserData(state) {
      state.authdata = null;
      state.otherUserData = null;
      state.selectedUser = null;
      state.onlineUser = [];
      // Clear user data from local storage
      try {
        localStorage.removeItem('authdata');
      } catch (e) {
        console.warn("Failed to clear authdata from local storage", e);
      }
    },
  },
});

export const { storeAuthData, storeOtherUserData, storeSelectedUser, clearSelectedUser, storeOnlineUser, clearUserData } = userSlice.actions;
export default userSlice.reducer;
