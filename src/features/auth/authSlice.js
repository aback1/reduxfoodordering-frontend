import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: "",
    showShoppingCart: false,
    showFoodSelection: true,
    selectedFoodOption: null,
    showOrderScreen: false,
    users: [
      {
        id: "",
        name: "",
        password: "",
      },
    ],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = "";
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      state.isLoggedIn = true;
      state.users.push(action.payload);
      state.currentUser = action.payload.id;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setShowShoppingCart: (state, action) => {
      state.showShoppingCart = action.payload;
    },
    setShowFoodSelection: (state, action) => {
      state.showFoodSelection = action.payload;
    },
    setSelectedFoodOption: (state, action) => {
      state.selectedFoodOption = action.payload;
    },
    setShowOrderScreen: (state, action) => {
      state.showOrderScreen = action.payload;
    },
  },
});

export const {
  login,
  logout,
  register,
  setCurrentUser,
  setUsers,
  setShowShoppingCart,
  setShowFoodSelection,
  setSelectedFoodOption,
  setShowOrderScreen,
} = authSlice.actions;
export default authSlice.reducer;
