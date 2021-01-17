const mongoose = require("mongoose");
const coupon_status = require("./coupon.constant").coupon_status;

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    status:{
        type: Number,
        default: coupon_status.READY
    },
    expired_at: {
        type: Date,
    },
    applied_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Coupon", couponSchema);
