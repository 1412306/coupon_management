"use strict";
const path = require("path");
const ValidateJWTMiddleware = require(path.resolve('./core/middleware/validate-jwt.js'));
const AuthenticationRouter = require(path.resolve('./src/api/authentication/authentication.route'));
const CouponRouter = require(path.resolve('./src/api/coupon/coupon.route'));

function initRouteModule(app) {
  app.use(`/${global.config.prefix_module.admin}authentication`, AuthenticationRouter);
  app.use(`/${global.config.prefix_module.admin}*`, ValidateJWTMiddleware.isAuth);
  app.use(`/${global.config.prefix_module.admin}coupon`, CouponRouter);


  app.use(function (req, res, next) {
    return res.status(404).send({
      error: true,
      message: "Page not found",
    });
    // next(createError(404));
  });
}

module.exports = initRouteModule;
