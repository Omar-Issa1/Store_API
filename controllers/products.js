const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "get all products" });
};
const getAllProductsStatic = async (req, res) => {
  throw new Error("Testing the error handler");
  // This is a test error
  res.status(200).json({ msg: "get products" });
};
export { getAllProducts, getAllProductsStatic };
