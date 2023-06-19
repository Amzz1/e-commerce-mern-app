// ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }) => {
  const { _id, imageUrl, title, price } = product;

  return (
    <div className="product-card">
      <div className="product-card_image img-wrapper">
        <img src={imageUrl} alt={title} />
      </div>
      <h4>
        <Link to={`product/${_id}`}>{title}</Link>
      </h4>
      <p>${price}</p>
      <StarRating rating={product.rating} />
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;


