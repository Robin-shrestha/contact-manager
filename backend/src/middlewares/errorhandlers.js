import Boom from "@hapi/boom";

const errorhandler = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(400).json(err);
  }
};

export default errorhandler;
