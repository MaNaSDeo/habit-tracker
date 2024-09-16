import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habitSlice";

export default configureStore({
  reducer: {
    habits: habitReducer,
  },
});
