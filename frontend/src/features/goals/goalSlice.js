import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  message: "",
  isLoading: false,
};

//ADD GOALS
export const addGoals = createAsyncThunk(
  "goals/add",
  async (data, thunkAPI) => {
    let formatted = { text: data };

    try {
      const token=thunkAPI.getState().auth.user.token
      return await goalService.addGoals(formatted,token);
    } catch (error) {
      let message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//DISPLAY GOALS
export const fetchGoals = createAsyncThunk(
  "goals/fetch",
  async (_, thunkAPI) => {
    try {
      const token=thunkAPI.getState().auth.user.token
      return await goalService.displayGoals(token);
    } catch (error) {
      let message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Goals
export const deleteGoals = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token=thunkAPI.getState().auth.user.token
      return await goalService.deleteGoals(id,token);
    } catch (error) {
      let message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const goalSlice = createSlice({
  name: "GOALS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGoals.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(fetchGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteGoals.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
      });
  },
});

export const {} = goalSlice.actions;
export default goalSlice.reducer;
