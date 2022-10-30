import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import submissionService from './submissionService'

const initialState = {
  submissions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Class
export const addSubmission = createAsyncThunk(
  'submissions/add',
  async (submittedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.addSubmission(submittedData, token)
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
export const getSubmissions = createAsyncThunk(
  'submissions/getSubmissions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.getSubmissions(token)
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
export const updateSubmission = createAsyncThunk(
    'submissions/update',
    async (newData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await submissionService.updateSubmission(newData.id, newData.activityData, token)
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
export const deleteSubmission = createAsyncThunk(
  'submissions/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.deleteSubmission(id, token)
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

export const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions.push(action.payload)
      })
      .addCase(addSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions = action.payload
      })
      .addCase(getSubmissions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions = action.payload
      })
      .addCase(updateSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions = state.submissions.filter(
          (submission) => submission._id !== action.payload.id
        )
      })
      .addCase(deleteSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer
