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
  let query = Product.find(queryObject);

  if (sort) {
    query = query.sort(sort.split(",").join(" "));
  } else {
    query = query.sort("createdAt");
  }

  if (fields) {
    query = query.select(fields.split(",").join(" "));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const products = await query.lean();

  if (products.length === 0) {
    return res.status(200).json({
      products,
      nbHits: 0,
      msg: "No products found",
    });
  }

  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts };
