
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../redux/cartReducer';
import { BsTrash3 } from 'react-icons/bs';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

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
  console.log(process.env.STRIPE_PUBLIC_KEY)
  const handleCheckout = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems), // Adjust the payload to send your cart items
    });
    
    const session = await response.json();
  
    // Load the Stripe instance
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
    // Redirect to the checkout page
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  };
  

  return (
    <div className='cart'>
      <h1 className='text-center'>Your cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <table className='max-1200'>
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
                <div className="img-wrapper item-img">
            <img src={item.imageUrl} alt='product-image'/>
          </div>
              <Link to={`product/${item._id}`}><div>{item.title} {item.color && <span>{item.color}</span>} {item.size && <span>{item.size} ml</span>}</div>  </Link>  
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
        <button onClick={handleCheckout}>Check out</button>
        </>
      )}
    </div>
  );
};

export default CartItems;
