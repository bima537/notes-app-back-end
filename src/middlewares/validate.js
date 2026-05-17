const validate = (schema) => (req, res, next) => {
  console.log('Middleware validate dipanggil!');
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) return next(error);

  req.validated = value;
  console.log('Data berhasil divalidasi:', req.validated);
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });
  if (error) return next(error);
  req.validated = value;
  next();
};

export { validate, validateQuery };