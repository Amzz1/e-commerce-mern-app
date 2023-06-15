// // CartItems.js
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateCartItem } from "../../../redux/cartReducer";
// import { BsTrash3 } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const CartItems = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (productId, color, size) => {
//     dispatch(removeFromCart({ productId, color, size }));
//   };

//   const handleDecreaseQuantity = (productId, color, size) => {
//     const item = cartItems.find(
//       (item) =>
//         item._id === productId && item.color === color && item.size === size
//     );
//     if (item && item.quantity > 1) {
//       const updatedProduct = { ...item, quantity: item.quantity - 1 };
//       dispatch(updateCartItem({ productId, color, size, updatedProduct }));
//     }
//   };

//   const handleIncreaseQuantity = (productId, color, size) => {
//     const item = cartItems.find(
//       (item) =>
//         item._id === productId && item.color === color && item.size === size
//     );
//     if (item) {
//       const updatedProduct = { ...item, quantity: item.quantity + 1 };
//       dispatch(updateCartItem({ productId, color, size, updatedProduct }));
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post('/create-checkout-session', cartItems);
//       const sessionId = response.data.id;
//       const stripe = await loadStripe('YOUR_STRIPE_PUBLIC_KEY');
//       stripe.redirectToCheckout({ sessionId });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th className="product">Product</th>
//                 <th className="qty">Quantity</th>
//                 <th className="price">Price</th>
//                 <th className="total">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id + item.color + item.size}>
//                   {/* ...your existing code... */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleCheckout}>Checkout</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartItems;

//seem
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../../redux/cartReducer';
import { BsTrash3 } from 'react-icons/bs';

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId, color, size) => {
    dispatch(removeFromCart({ productId, color, size }));
  };

  const handleDecreaseQuantity = (productId, color, size) => {
    const item = cartItems.find((item) => item._id === productId && item.color === color && item.size === size);
    if (item && item.quantity > 1) {
      const updatedProduct = { ...item, quantity: item.quantity - 1 };
      dispatch(updateCartItem({ productId, color, size, updatedProduct }));
    }
  };

  const handleIncreaseQuantity = (productId, color, size) => {
    const item = cartItems.find((item) => item._id === productId && item.color === color && item.size === size);
    if (item) {
      const updatedProduct = { ...item, quantity: item.quantity + 1 };
      dispatch(updateCartItem({ productId, color, size, updatedProduct }));
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="product">Product</th>
              <th className="qty">Quantity</th>
              <th className="price">Price</th>
              <th className="total">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id + item.color + item.size}>
                <td className="item-title">
                  {item.title} {item.color && <span>{item.color}</span>} {item.size && <span>{item.size}</span>}
                </td>
                <td className="quantity">
                  <button onClick={() => handleDecreaseQuantity(item._id, item.color, item.size)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncreaseQuantity(item._id, item.color, item.size)}>+</button>
                  <button className="delete" onClick={() => handleRemoveFromCart(item._id, item.color, item.size)}>
                    <BsTrash3 />
                  </button>
                </td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartItems;
