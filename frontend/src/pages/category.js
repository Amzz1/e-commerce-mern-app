import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Category = () => {
  let { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      console.log("get category")
      const queryParams = new URLSearchParams(location.search);
      const filters = {};
      for (let [key, value] of queryParams.entries()) {
        filters[key] = value;
      }
      setSelectedFilters(filters);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/category/${name}${location.search}`
      );
      const { products, colors, sizes, prices, brands } = response.data;
      setProducts(products);
      setColors(colors || []); // Initialize as empty array
      setSizes(sizes || []); // Initialize as empty array
      setPrices(prices || []); // Initialize as empty array
      setBrands(brands || []); // Initialize as empty array
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterClick = async (filterType, filterValue) => {
    try {
      const filters = { ...selectedFilters };
  
      if (filters[filterType] === filterValue.toString()) {
        delete filters[filterType];
      } else {
        filters[filterType] = filterValue.toString();
      }
  
      const queryParams = new URLSearchParams(filters);
      navigate(`${location.pathname}?${queryParams.toString()}`);
    } catch (error) {
      console.error(error);
    }
  };
  

  // const getSpanClassName = (filterType, filterValue) => {
  //   return selectedFilters[filterType] === filterValue ? "active" : "";
  // };
  const getSpanClassName = (filterType, filterValue) => {
    const selectedFilterValue = selectedFilters[filterType];
    if (filterType === "price" || filterType === "size") {
      return selectedFilterValue === filterValue.toString() ? "active" : "";
    }
    return selectedFilterValue === filterValue ? "active" : "";
  };
  

  // Sort the filter arrays before rendering
  const sortedColors = colors.slice().sort();
  const sortedSizes = sizes.slice().sort((a, b) => a - b);
  const sortedPrices = prices.slice().sort((a, b) => a - b);
  const sortedBrands = brands.slice().sort();

  return (
    <div className="category-wapper max-1400">
      <div className="filter-tree">
        <div className="colorDiv">
          {sortedColors.length > 0 && <h3>Color</h3>}
          <div>
            {sortedColors.map((color) => (
              <span
                key={color}
                onClick={() => handleFilterClick("color", color)}
                className={getSpanClassName("color", color)}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
        <div className="sizeDiv">
          {sortedSizes.length > 0 && <h3>Size</h3>}
          <div>
            {sortedSizes.map((size) => (
              <span
                key={size}
                onClick={() => handleFilterClick("size", size)}
                className={getSpanClassName("size", size)}
              >
                {size} ml
              </span>
            ))}
          </div>
        </div>
        <div className="priceDiv">
          {sortedPrices.length > 0 && <h3>Price</h3>}
          <div>
            {sortedPrices.map((price) => (
              <span
                key={price}
                onClick={() => handleFilterClick("price", price)}
                className={getSpanClassName("price", price)}
              >
                {price}
              </span>
            ))}
          </div>
        </div>
        <div className="brandDiv">
          {sortedBrands.length > 0 && <h3>Brand</h3>}
          <div>
            {sortedBrands.map((brand) => (
              <span
                key={brand}
                onClick={() => handleFilterClick("brand", brand)}
                className={getSpanClassName("brand", brand)}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        
        {/* {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))} */}
          
        {products.length > 0?(products.map((item)=>(
          <ProductCard key={item._id} product={item}/>
        ))):(<div style={{fontSize:"30px"}}>No products found</div>)}
      </div>
    </div>
  );
};

export default Category;