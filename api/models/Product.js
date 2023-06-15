import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: String,
    brand: String,
    price: Number,
    description: String,
    whatIsIt:String,
    highlightedIngredients: String,
    whatElseYouNeedToKnow:String,
    variants: [String],
    tags: [String],
    size: [Number],
    color: [String],
    rating: Number,
    imageUrl: String,
  });

export default mongoose.model('Product', productSchema);


  