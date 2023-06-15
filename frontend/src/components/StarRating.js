// StarRating.js
import React from 'react';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  for (let i = 0; i < 5; i++) {
    if (roundedRating >= i + 1) {
      stars.push(<FaStar key={i} />);
    } else if (roundedRating >= i + 0.5) {
      stars.push(<FaStarHalf key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
