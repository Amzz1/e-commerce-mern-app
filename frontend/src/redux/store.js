import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    auth: store.getState().auth,

    
  });
});

export default store;
