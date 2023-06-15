import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(
        (item) => item._id === newItem._id && item.color === newItem.color && item.size === newItem.size
      );
    
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push(newItem);
      }
    },
    
    updateCartItem: (state, action) => {
      const { productId, color, size, updatedProduct } = action.payload;
      const item = state.find((item) => item._id === productId && item.color === color && item.size === size);
    
      if (item) {
        item.quantity = updatedProduct.quantity;
      }
    },

    removeFromCart: (state, action) => {
      const { productId, color, size } = action.payload;
      const itemIndex = state.findIndex(
        (item) => item._id === productId && item.color === color && item.size === size
      );
    
      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
    
  },
});

export const { addToCart, updateCartItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
