import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import questionsReducer from "../features/questions/questionsSlice";

const store = configureStore({
    reducer: {
        questions: questionsReducer,
        auth: authReducer,
    }
})

export default store;