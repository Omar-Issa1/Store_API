import dotenv from "dotenv";
import express from "express";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Store API", routes: ["/api/v1/products"] });
});
app.use("/api/v1/products", productsRouter);
// Products route
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
