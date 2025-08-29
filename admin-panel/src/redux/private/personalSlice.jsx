import { createSlice } from '@reduxjs/toolkit'

export const personalSlice = createSlice({
  name: 'personal',
  initialState: {
    data: null
  },
  reducers: {
    setPersonalData: (state, action) => {
      state.data = action.payload
    },
    clearPersonalData: (state) => {
      state.data = null
    },
  }
})

export const { setPersonalData, clearPersonalData } = personalSlice.actions

export default personalSlice.reducer
