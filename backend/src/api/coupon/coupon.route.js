const express = require("express");
const router = express.Router();
const path = require("path");
const CouponController = require(path.resolve("./src/api/coupon/coupon.controller"));

router.post("/create", CouponController.create);
router.post("/list", CouponController.list);
router.put("/extend", CouponController.extend);
router.put("/apply", CouponController.apply);
router.post("/summary", CouponController.summary);

module.exports = router;
