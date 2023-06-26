
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';


const ProductCardEdit = ({ product }) => {
  const { _id, imageUrl, title, price } = product;

  return (
    <div className="product-card">
      <div className="product-card_image img-wrapper">
        <img src={imageUrl} alt={title} />
      </div>
      <h4>
       {title}
      </h4>
      <p>${price}</p>
   <button> <Link to={`/admin/edit-product/${_id}`}>Edit Product</Link></button>


    </div>
  );
};


const GetAllProducts = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async () =>{
        const response = await axios.get( `${process.env.REACT_APP_API_URL}/product`)
        setProducts(response.data)
    }
  
  return (
    <div className='product-grid'>
        {products.length > 0?(products.map((item)=>(
            <ProductCardEdit product={item}/>
        ) )):<p>no products found</p>}
    </div>
  )
}

export default GetAllProducts