import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    maxlength: [100, "Product name cannot be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
