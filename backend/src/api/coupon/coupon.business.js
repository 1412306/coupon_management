"use strict";
const path = require("path");
const _ = require("lodash");

const CouponModel = require(path.resolve("./src/api/coupon/coupon.model"));
const coupon_status = require("./coupon.constant").coupon_status || {};

module.exports = class CouponBusiness {
    async create(data) {
        try {
            return await CouponModel.create(data)
        } catch (e) {
            throw new Error(e);
        }
    }

    async findByCode(code) {
        try {
            return await CouponModel.find({code: code.trim()})
        } catch (e) {
            throw new Error(e);
        }
    }

    async apply(id) {
        try {
            return await CouponModel.updateOne({_id : id}, {status: coupon_status.USED, applied_at: new Date()});
        } catch (e) {
            throw new Error(e);
        }
    }

    async extend(id, newExpiredTime) {
        try {
            return await CouponModel.update({_id: id}, {expired_at: newExpiredTime, updated_at: new Date()})
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAll(code = null) {
        try {
            if (code) {
                return await CouponModel.find({code: code.trim()}).sort({'created_at': -1})
            }
            return await CouponModel.find({}).sort({'created_at': -1, 'expired_at': -1})
        } catch (e) {
            throw new Error(e);
        }
    }

    async count(type) {
        try {
            switch (type){
                case 'USED':
                    return await CouponModel.count({status: coupon_status.USED});
                    break;
                case 'EXPIRED':
                    return await CouponModel.count({status: coupon_status.READY, expired_at: {$lt: new Date()}});
                    break;
                case 'READY':
                    return await CouponModel.count({status: coupon_status.READY, expired_at: {$gt: new Date()}});
                    break;
                default:
                    return 0
            }
        } catch (e) {
            throw new Error(e);
        }
    }
};
