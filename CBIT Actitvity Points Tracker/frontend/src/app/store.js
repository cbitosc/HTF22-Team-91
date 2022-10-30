import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice' 
import userReducer from '../features/users/userSlice'
import classReducer from '../features/classes/classSlice';
import activityReducer from '../features/activities/activitySlice';
import submissionReducer from '../features/submissions/submissionSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    classes: classReducer,
    activities: activityReducer,
    submissions: submissionReducer
  },
});
