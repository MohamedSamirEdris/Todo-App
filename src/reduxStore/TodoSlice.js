import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosList: []
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.todosList.push(action.payload);
    },
    deleteTodos: (state, action) => {
      state.todosList = state.todosList.filter((item) => item._id !== action.payload);
    },
    editTodo: (state, action) => {
      const { _id, todo } = action.payload;
      const todoIndex = state.todosList.findIndex((item) => item._id === _id);
      if (todoIndex !== -1) {
        state.todosList[todoIndex].todo = todo;
      }
    },
    removeTodos: (state) => {
      state.todosList = [];
    }
  }
});

export const { addTodos, deleteTodos, editTodo, removeTodos } = todoSlice.actions;
export default todoSlice.reducer;
