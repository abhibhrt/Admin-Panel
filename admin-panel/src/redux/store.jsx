import { configureStore } from '@reduxjs/toolkit'
import personalSlice from './private/personalSlice'

export default configureStore({
  reducer: {
    personal: personalSlice,
  }
})