import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService' 

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Login user
export const login = createAsyncThunk('auth/login', 
async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Create new user
export const updateUser = createAsyncThunk(
    'auth/update',
    async (userData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        const id = thunkAPI.getState().auth.user._id
        return await authService.updateUser(userData, token, id)
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

// Logout user
export const logout = createAsyncThunk('auth/logout',
async () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer