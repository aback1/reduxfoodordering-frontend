/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  userID: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { userID, items } = action.payload;
      state.userID = userID;
      state.items = items;
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;*/
