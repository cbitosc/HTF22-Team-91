import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "./activityService";

const initialState = {
  activities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Activity
export const addActivity = createAsyncThunk(
  "activities/add",
  async (ActivityData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await activityService.addActivity(ActivityData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all students
export const getActivities = createAsyncThunk(
  "activities/getActivities",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await activityService.getActivities(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Activity
export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await activityService.deleteActivity(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(action.payload);
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activities = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activities = state.users.filter(
          (activity) => activity._id !== action.payload.id
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = activitySlice.actions;
export default activitySlice.reducer;
