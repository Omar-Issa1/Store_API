import product from "../models/product.js";

const getAllProductsStatic = async (req, res) => {
  const products = await product.find({ price: { $gt: 30 } }).sort("price");
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // Numeric Filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>=|<=|>|<|=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        if (!queryObject[field]) queryObject[field] = {};
        queryObject[field][operator] = Number(value);
      }
    });
  }
  console.log(queryObject);
  let result = product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  // console.log(page, limit, skip);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
export { getAllProducts, getAllProductsStatic };
