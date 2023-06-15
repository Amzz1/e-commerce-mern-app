import mongoose from "mongoose";
const customerEmailSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
  });


export default mongoose.model('CustomerEmail',customerEmailSchema)