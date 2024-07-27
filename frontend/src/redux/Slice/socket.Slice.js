import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null
    },
    reducers: {
        storeSocketData: (state, action) => {
            state.socket = action.payload
        }
    }

})
export const { storeSocketData } = socketSlice.actions
export default socketSlice.reducer