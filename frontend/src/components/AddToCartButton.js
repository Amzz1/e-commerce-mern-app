// AddToCartButton.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [backgroundColor, setBackgroundColor] = useState('#ee6983');
  const [color, setColor] = useState('#fff');
  const [text, setText] = useState('Add to cart');

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
      color: selectedColor,
      size: selectedSize,
    };
    dispatch(addToCart(cartItem));
    setBackgroundColor('#37ae6f');
    setColor('white');
    setText('Added to cart!');

    setTimeout(() => {
      setBackgroundColor('#ee6983');
      setColor('#fff');
      setText('Add to cart');
    }, 1500);
  };

  const [selectedColor, setSelectedColor] = useState(
    product?.color && product?.color.length > 0 ? product?.color[0] : ''
  );
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const [selectedSize, setSelectedSize] = useState(
    product?.size && product?.size.length > 0 ? product?.size[0] : ''
  );
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      {product?.color && product?.color.length > 0 && (
        <div className="variant-options">
          {product?.color.map((color) => (
            <span
              key={color}
              className={selectedColor === color ? 'selected' : ''}
              onClick={() => handleColorChange(color)}
            >
              {color}
            </span>
          ))}
        </div>
      )}

      {product?.size && product?.size.length > 0 && (
        <div className="variant-options">
          {product.size.map((size) => (
            <span
              key={size}
              className={selectedSize === size ? 'selected' : ''}
              onClick={() => handleSizeChange(size)}
            >
              {size}ml
            </span>
          ))}
        </div>
      )}

      <button
        style={{ backgroundColor, color }}
        onClick={handleAddToCart}
      >
        {text}
      </button>
    </div>
  );
};

export default AddToCartButton;
