import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  students: [],
  mentors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new user
export const addAdmin = createAsyncThunk(
  'users/addAdmin',
  async (userData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await userService.addAdmin(userData)
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

// Create new user
export const addUser = createAsyncThunk(
  'users/add',
  async (userData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await userService.addUser(userData)
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

// Get all mentors
export const getStudents = createAsyncThunk(
  'users/getStudents',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getStudents(token)
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
export const getMentors = createAsyncThunk(
  'users/getMentors',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getMentors(token)
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
// Delete user
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.deleteUser(id, token)
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

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users.push(action.payload)
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMentors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMentors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mentors = action.payload
      })
      .addCase(getMentors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        )
        state.mentors = state.mentors.filter(
          (mentor) => mentor._id !== action.payload.id
        )
        state.students = state.students.filter(
          (student) => student._id !== action.payload.id
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
