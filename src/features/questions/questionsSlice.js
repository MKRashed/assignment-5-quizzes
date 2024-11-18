import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        "id": 1,
        "question": "What is JavaScript?",
        "options": [
          "A programming language",
          "A markup language",
          "A stylesheet language",
          "A database"
        ],
        "marks": 5
      },
   ]

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion(state, action) {}
    }

})