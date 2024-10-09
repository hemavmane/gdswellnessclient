import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch {
    // ignore write errors
  }
};

const initialState = loadState() || {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      saveState(state);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity++;
        saveState(state);
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        saveState(state);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item._id !== id);
      saveState(state);
    },
    clearCart: state => {
      state.items = [];
      saveState(state); 
    },
  },
});

export const {
  addToCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
