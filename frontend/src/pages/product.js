import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import StarRating from '../components/StarRating'
import AddToCartButton from "../components/AddToCartButton"



const Product = () => {

    const {id} = useParams()
    const [product,setProduct] = useState([])

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData  = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
            setProduct(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
  
    const handleClickButton1 = () => {
      setShowDiv1(true);
      setShowDiv2(false);
      setShowDiv3(false);
    };
  
    const handleClickButton2 = () => {
      setShowDiv1(false);
      setShowDiv2(true);
      setShowDiv3(false);
    };
  
    const handleClickButton3 = () => {
      setShowDiv1(false);
      setShowDiv2(false);
      setShowDiv3(true);
    };
  return (
    <div className='product-detail grid grid-50 max-1400'>
         <div className="img-wrapper">
            <img src={product.imageUrl} alt="image" />
          </div>
          <div className='product-detail_info'>
         
            <h2>{product.title}</h2>
            <h5>{product.brand}</h5>
           
            <StarRating rating={product.rating}/>
            <span className='price'>
                ${product.price}
            </span>
            <p>{product.description}</p>
            <AddToCartButton  product={product}/>
          </div>
          <div className='product-detail_addition-info'>
          <div>
      <button className={`${showDiv1}`} onClick={handleClickButton1}>What is it</button>
      <button className={`${showDiv2}`} onClick={handleClickButton2}>Highlighted ingredients</button>
      <button className={`${showDiv3}`}  onClick={handleClickButton3}>What else you need to know</button>

      {showDiv1 && <p >{product.whatIsIt}</p>}
      {showDiv2 && <p >{product.highlightedIngredients}</p>}
      {showDiv3 && <p >{product.whatElseYouNeedToKnow}</p>}
    </div>
          </div>
    </div>
  )
}

export default Product