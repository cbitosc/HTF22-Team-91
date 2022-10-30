import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import classService from './classService'

const initialState = {
  classes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Class
export const addClass = createAsyncThunk(
  'classes/add',
  async (ClassData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await classService.addClass(ClassData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all students
export const getClasses = createAsyncThunk(
  'classes/getClasses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await classService.getClasses(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete Class
export const deleteClass = createAsyncThunk(
  'classes/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await classService.deleteClass(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClass.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.classes.push(action.payload)
      })
      .addCase(addClass.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.classes = action.payload
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.classes = state.classes.filter(
          (Class) => Class._id !== action.payload.id
        )
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = classSlice.actions
export default classSlice.reducer
