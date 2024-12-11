import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        events: eventSlice
    }
})

export default store