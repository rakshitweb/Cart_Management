import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";

import UISliceReducer from './UISlice';

const store = configureStore({
    reducer: {
        UI: UISliceReducer,
        cart: cartSliceReducer
    }
})

export default store;