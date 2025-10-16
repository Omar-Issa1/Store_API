import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true";
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // console.log(queryObject);

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
    // "discount", "stock" for later use
    const options = ["price", "rating", "discount", "stock"];

    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      const num = Number(value);
      if (!isNaN(num) && options.includes(field)) {
        if (!queryObject[field]) queryObject[field] = {};
        queryObject[field][operator] = num;
      }
    });
    // console.log("numericFilters:", req.query.numericFilters);
  }
  let result = Product.find(queryObject);

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

  const products = await result.lean();

  if (products.length === 0) {
    return res.status(200).json({ msg: "No products found", nbHits: 0 });
  }
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts };
