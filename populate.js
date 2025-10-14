import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import Product from "./models/product.js";
import jsonProducts from "./products.json" with { type: "json" };
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany();
    const products = await Product.create(jsonProducts);
    console.log("Data populated successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
// To run this file, use the command: node populate.js
