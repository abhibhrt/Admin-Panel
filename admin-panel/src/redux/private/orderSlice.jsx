import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: []
  },
  reducers: {
    setOrderData: (state, action) => {
      state.data = action.payload
    },
    clearOrderData: (state) => {
      state.data = []
    },
    updateOrderData: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.data.findIndex(order => order.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updates };
      }
    }
  }
})

export const { setOrderData, clearOrderData, updateOrderData } = orderSlice.actions
export default orderSlice.reducer
