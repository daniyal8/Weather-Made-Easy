import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        value: null,
        result: [],
        selectedValue: null,
    },
    reducers: {
        locationSearch: (state, action) => {
            state.value = action.payload;
            if (!action.payload) {
                state.result = [];
              }
        },
        locationResult: (state, action) => {
            state.result = action.payload
        },
        locationSelected: (state, action) => {
            state.selectedValue = action.payload
        }
    }
})
export const { locationResult, locationSearch, locationSelected } = locationSlice.actions
export default  locationSlice.reducer