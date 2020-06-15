const errorHandler = (err, _, res, next) => {
  const { message, stack } = err;
  const status = err.statusCode || err.status || 500;

  if (status >= 400) {
    console.error({ status, message });
  } else {
    console.warn({ status, message });
  }

  return res.status(status).send({ error: message || "Internal Server Error" });
};

export default errorHandler;
