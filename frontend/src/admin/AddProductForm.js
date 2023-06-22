//AddProductForm.js
import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiUrl/apiUrl";

function AddProductForm() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [whatIsIt, setWhatIsIt] = useState("");
  const [highlightedIngredients, setHighlightedIngredients] = useState("");
  const [whatElseYouNeedToKnow, setWhatElseYouNeedToKnow] = useState("");
  const [variants, setVariants] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

//   console.log("add product route");

  const handleImageUpload = (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl);
  };

  const handleVariantChange = (index, event) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = event.target.value;
    setVariants(updatedVariants);
  };
  const handleColorChange = (index, event) => {
    const updatedColor = [...color];
    updatedColor[index] = event.target.value;
    setColor(updatedColor);
  };
  const handleSizeChange = (index, event) => {
    const updatedSize = [...size];
    updatedSize[index] = event.target.value;
    setSize(updatedSize);
  };
  const handleTagChange = (index, event) => {
    const updatedTags = [...tags];
    updatedTags[index] = event.target.value;
    setTags(updatedTags);
  };

  const handleAddVariant = () => {
    setVariants([...variants, ""]);
  };
  const handleAddSize = () => {
    setSize([...size, ""]);
  };
  const handleAddColor = () => {
    setColor([...color, ""]);
  };
  const handleAddTags = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  const handleRemoveColor = (index) => {
    const updatedColor = [...color];
    updatedColor.splice(index, 1);
    setColor(updatedColor);
  };
  const handleRemoveSize = (index) => {
    const updatedSize = [...size];
    updatedSize.splice(index, 1);
    setSize(updatedSize);
  };
  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product`, {
        title,
        brand,
        price,
        description,
        whatIsIt,
        highlightedIngredients,
        whatElseYouNeedToKnow,
        variants,
        color,
        size,
        tags,
        rating,
        imageUrl,
      });

      if (response.status === 201) {
        console.log("Product was successfully added");
        // Reset form fields
        setTitle("");
        setBrand("");
        setPrice("");
        setDescription("");
        setWhatIsIt("");
        setHighlightedIngredients("")
        setWhatElseYouNeedToKnow("");
        setVariants([]);
        setSize([]);
        setColor([]);
        setTags([]);
        setRating("");
        setImageUrl("");
      } else {
        console.error("Failed to add product");
      }
      // navigate('/products');
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add product form</h2>
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Brand:
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          className="description-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br/>
      <label>
      What Is It:
        <textarea
          className="whatIsIt-textarea"
          value={whatIsIt}
          onChange={(e) => setWhatIsIt(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Highlighted Ingredients:
        <textarea
          className="highlightedIngredients-textarea"
          value={highlightedIngredients}
          onChange={(e) => setHighlightedIngredients(e.target.value)}
        />
      </label>
      <br/>
      <label>
        What Else You Need to Know:
        <textarea
          className="whatElseYouNeedToKnow-textarea"
          value={whatElseYouNeedToKnow}
          onChange={(e) => setWhatElseYouNeedToKnow(e.target.value)}
        />
      </label>
      <br />
      {variants.map((variant, index) => (
        <div key={index}>
          <label>
            Variant {index + 1}:
            <input
              type="text"
              value={variant}
              onChange={(e) => handleVariantChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveVariant(index)}>
            Remove Variant
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddVariant}>
        Add Variant
      </button>
      <br/>
      {color.map((color, index) => (
        <div key={index}>
          <label>
            Color {index + 1}:
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveColor(index)}>
            Remove Color
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddColor}>
        Add Color
      </button>
      <br/>
      {size.map((size, index) => (
        <div key={index}>
          <label>
            Size {index + 1}:
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveSize(index)}>
            Remove Size
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSize}>
        Add Size
      </button>
      <br/>
      {tags.map((tag, index) => (
        <div key={index}>
          <label>
            Tags {index + 1}:
            <input
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveTag(index)}>
            Remove Tag
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddTags}>
        Add Tags
      </button>
      <br />
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image Upload:
        <ImageUpload onUpload={handleImageUpload} />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
    </div>
  );
}

export default AddProductForm;