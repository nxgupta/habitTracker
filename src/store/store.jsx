import {configureStore} from "@reduxjs/toolkit"
import habitReducer from "./habitSlice"

let store = configureStore({
  reducer: {
    habits: habitReducer,
  },
})

export default store
