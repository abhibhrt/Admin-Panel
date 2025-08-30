import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: []
  },
  reducers: {
    setProductData: (state, action) => {
      state.data = action.payload
    },
    clearProductData: (state) => {
      state.data = []
    },
    updateProductData: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.data.findIndex(product => product.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updates };
      }
    }
  }
})

export const { setProductData, clearProductData, updateProductData } = productSlice.actions
export default productSlice.reducer
