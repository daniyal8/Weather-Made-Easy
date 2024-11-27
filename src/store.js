import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./features/locationSlice"
import { weatherSlice } from "./features/weatherSlice";

const store = configureStore({
    reducer: {
        location: LocationReducer,
        weather: weatherSlice.reducer
    },
})
export default store