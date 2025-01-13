import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    addItem: (state, action) => {
      const { title, name, amount, price } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.amount += amount;
      } else {
        state.items.push({ title, name, amount, price });
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
    setAmount: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        if (amount === 0) {
          state.items = state.items.filter((item) => item.name !== name);
        } else {
          existingItem.amount = amount;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setUserID, addItem, removeItem, setAmount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
