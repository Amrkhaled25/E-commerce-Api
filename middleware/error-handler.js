const errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || 400)
    .json({ msg: err.message || "something went wrong please try again" });
};
module.exports = errorHandler;
