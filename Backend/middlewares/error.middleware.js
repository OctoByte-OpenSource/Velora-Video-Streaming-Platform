const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errMessage = err.message;

  const response = {
    success: false,
    message: errMessage,
  };

  return res.status(statusCode).json(response);
};

module.exports = { errorMiddleware };
