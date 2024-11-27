import { createSlice } from "@reduxjs/toolkit";


export const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        result: null
    },
    reducers: {
        weatherResult: (state, action) => {
          state.result = action.payload 
        }
    }
})

export const { weatherResult } = weatherSlice.actions
export default weatherSlice.reducer