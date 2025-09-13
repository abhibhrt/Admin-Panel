import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: []
  },
  reducers: {
    setProductData: (state, action) => {
      state.data = action.payload;
    },

    clearProductData: (state) => {
      state.data = [];
    },

    addProductData: (state, action) => {
      state.data.push(action.payload);
    },

    updateProductData: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.data.findIndex(product => product.id === id);
      if (index !== -1) {
        state.data[index] = {...updates, id: id};
      }
    },

    // Delete a single product
    deleteProductData: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter(product => product.id !== id);
    }
  }
});

export const {
  setProductData,
  clearProductData,
  addProductData,
  updateProductData,
  deleteProductData
} = productSlice.actions;

export default productSlice.reducer;
