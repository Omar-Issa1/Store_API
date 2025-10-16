const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  const status = err.statusCode || 500;
  const msg =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Something went wrong, please try again later";
  res.status(status).json({ msg });
};
export default errorHandlerMiddleware;
