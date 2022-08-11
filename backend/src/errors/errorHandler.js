const errorHandler = (err, _req, res, _next) => {
  if (err.code === 11000) {
    const errorField = err?.keyValue?.name;

    if (errorField) {
      console.error(err);
      return res.status(409).json({
        status: "ERROR",
        data: {
          message: `Duplicate Entry Found For ${errorField}`,
        },
      });
    }
  }
  console.error(err.message);
  return res.status(err?.httpCode || 500).json({
    status: "ERROR",
    data: {
      message: err.message,
    },
  });
};

export default errorHandler;
