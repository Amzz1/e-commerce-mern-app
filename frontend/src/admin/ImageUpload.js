//ImageUpload.js
import React, { useState , useEffect} from 'react';
import axios from 'axios';
const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.imageUrl;
      setImageUrl(imageUrl);
      if (onUpload && typeof onUpload === 'function') {
        onUpload(imageUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />

      <div>
        <label htmlFor="image-url">Image URL:</label>
        <input
          id="image-url"
          type="text"
          value={imageUrl}
          readOnly
        />
      </div>
    </div>
  );
};

export default ImageUpload;
