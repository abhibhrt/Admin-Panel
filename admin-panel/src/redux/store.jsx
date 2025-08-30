import { configureStore } from '@reduxjs/toolkit'
import personalSlice from './private/personalSlice'
import userSlice from './private/userSlice'
import orderSlice from './private/orderSlice'
import productSlice from './private/productSlice'

export default configureStore({
  reducer: {
    personal: personalSlice,
    user: userSlice,
    order: orderSlice,
    product: productSlice,
  }
})