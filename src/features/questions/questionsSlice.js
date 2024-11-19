import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "./questionsAPI";

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  async () => {
    const questions = await getQuestions()
    return questions;
  }
});


const questionsSlice = createSlice({
    name: 'questions',
    initialState : { 
      questions: [],
      currentQuestionIndex: 0,
      loading: false,
      error: null,
    },

    reducers: {
        addQuestion: (state, action) => {

        },
        questionSubmit: (state, action) => {

        },

        nextQuestion: (state) => {
          if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex += 1;
          }
        },

        previousQuestion : (state) => {
          if (state.currentQuestionIndex > 0) {
            state.currentQuestionIndex -= 1;
          }
        },

        resetQuestions: (state) => {
          state.questions = [];
          state.currentQuestionIndex = 0;
          state.loading = false;
          state.error = null;
        },
   },
    extraReducers: (builder) => {
      builder
        .addCase(fetchQuestions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
          state.loading = false;
          state.questions = action.payload;
        })
        .addCase(fetchQuestions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error?.message;
        });
    },

})

export default questionsSlice.reducer;

export const { 
  addQuestion,
  questionSubmit, 
  nextQuestion, 
  previousQuestion,
  resetQuestions } = questionsSlice.actions;