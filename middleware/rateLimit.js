const rateLimit = require("express-rate-limit");

const apiRateLimiter = (time, limit) => {
  return rateLimit({
    windowMs: time || 1 * 60 * 1000, // 1 minutes
    limit: limit || 3, // Limit each IP to 3 requests per `window` (here, per 1 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: (req, res) => {
      res
        .status(429)
        .json({ error: "Too many requests, please try again later" });
    },
    // store: ... , // Redis, Memcached, etc. See below.
  });
};

module.exports = apiRateLimiter;
