const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(`Error caught by middleware: ${err}`);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;
