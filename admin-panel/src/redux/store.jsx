import { configureStore } from '@reduxjs/toolkit'
import personalSlice from './private/personalSlice'
import userSlice from './private/userSlice'

export default configureStore({
  reducer: {
    personal: personalSlice,
    user: userSlice,
  }
})