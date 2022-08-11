const validationMiddleware =
  (schema, type = "body") =>
  async (req, _, next) => {
    try {
      if (type === "body") {
        await schema.validate(req.body, { strict: true });
      } else if (type === "params") {
        await schema.validate(req.params, { strict: true });
      } else if (type === "query") {
        await schema.validate(req.query, { strict: true });
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };

export default validationMiddleware;
